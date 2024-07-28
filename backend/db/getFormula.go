package db

import (
	"Cubonauta/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
)

func GetFormula(method string, id int) models.Skeleton_Data {

	client, err := GetClient()

	if err != nil {
		panic(err)
	}

	var formula bson.M
	collection := client.Database("CFOP").Collection(method)
	err = collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&formula)
	if err != nil {
		panic(err)
	}

	var formulaOBJ models.Skeleton_Data
	bsonBytes, _ := bson.Marshal(formula)
	bson.Unmarshal(bsonBytes, &formulaOBJ)

	return formulaOBJ

}
