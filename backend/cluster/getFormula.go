package cluster

import (
	"Cubonauta/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetFormula(category string, id int) models.Case {
	connection := GetInstance()

	var collection *mongo.Collection = connection.Cli.Database("CFOP").Collection(category)

	var result bson.M
	collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&result)
	return ConvertBsonToObject(result)
}

func ConvertBsonToObject(formula bson.M) models.Case {
	var obj models.Case
	bsonBytes, _ := bson.Marshal(formula)
	bson.Unmarshal(bsonBytes, &obj)

	return obj
}
