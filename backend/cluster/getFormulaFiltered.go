package cluster

import (
	"Cubonauta/models"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetFormulaFiltered(category string, id int, filters []string) (models.Case, int) {
	connection := GetInstance()

	var collection *mongo.Collection = connection.Cli.Database("CFOP").Collection(category)
	var tags bson.A = getTags(filters)
	var pipeline mongo.Pipeline = getPipeline(id, tags)

	cursor, _ := collection.Aggregate(context.TODO(), pipeline)
	defer cursor.Close(context.TODO())

	result, err := getResult(cursor)

	if err == 1 {
		return result, err
	}

	return result, 0
}

// Compare te receivede tag with a list to see if it is valid, if it is, it can be used as filter in search
func validateTags(filter string) bool {
	filters := GetFilters()
	for i := 0; i < len(filters); i++ {
		if filter == filters[i] {
			return true
		}
	}
	return false
}

// Validate all tags received by http request and create a bson if is valid
func getTags(filters []string) bson.A {
	var valids []string
	for i := 0; i < len(filters); i++ {
		if validateTags(filters[i]) {
			valids = append(valids, filters[i])
		}
	}

	var tags bson.A = make(bson.A, len(valids))
	for index, item := range valids {
		tags[index] = item
	}
	return tags
}

func getPipeline(id int, tags bson.A) mongo.Pipeline {
	return mongo.Pipeline{
		{{Key: "$match", Value: bson.D{{Key: "_id", Value: id}}}},
		{{Key: "$project", Value: bson.D{
			{Key: "Name", Value: 1},
			{Key: "Formulas", Value: bson.D{
				{Key: "$filter", Value: bson.D{
					{Key: "input", Value: "$Formulas"},
					{Key: "as", Value: "formula"},
					{Key: "cond", Value: bson.D{
						{Key: "$gt", Value: bson.A{
							bson.D{{Key: "$size", Value: bson.D{{Key: "$setIntersection", Value: bson.A{tags, "$$formula.Tags"}}}}},
							0,
						}},
					}},
				}},
			}},
		}}},
	}
}

func getResult(cursor *mongo.Cursor) (models.Case, int) {
	var result bson.M

	if cursor.Next(context.TODO()) {
		//If found any formula
		err := cursor.Decode(&result)
		if err != nil {
			log.Fatal("Error during unmarshaling the document in getResult")
		}
		var result_object = ConvertBsonToObject(result)
		return result_object, 0
	} else {
		fmt.Println("Document not founded")
		return models.Case{}, 1
	}
}
