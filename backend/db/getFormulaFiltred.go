package db

import (
	"Cubonauta/models"
	"Cubonauta/utils"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetFormulaFiltred(method string, id int, filters []string) models.DB_Case {
	client, err := GetClient()
	if err != nil {
		fmt.Println("Erro na função getClient ao chamar no getFormula")
		panic(err)
	}

	var collection *mongo.Collection = client.Database("CFOP").Collection(method)
	//Convert Filters to Tags format
	var tags bson.A = getTags(filters)
	var pipeline mongo.Pipeline = getPipeline(id, tags)

	cursor, _ := collection.Aggregate(context.TODO(), pipeline)
	defer cursor.Close(context.TODO())

	var result models.DB_Case = getResult(cursor)

	return result

}

func getTags(filters []string) bson.A {
	var tags bson.A = make(bson.A, len(filters))
	for index, item := range filters {
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

func getResult(cursor *mongo.Cursor) models.DB_Case {
	var result bson.M

	if cursor.Next(context.TODO()) {
		//If found any formula
		err := cursor.Decode(&result)
		if err != nil {
			log.Fatal("Error during unmarshaling the document in getResult")
		}
		var result_object = utils.ConvertBsonToObject(result)
		return result_object
	} else {
		log.Fatal("Document not founded")
		return models.DB_Case{}
	}
}
