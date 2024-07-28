package db

import (
	"Cubonauta/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
)

func GetFormula(method string, id int, size int) ([]models.Formula_Skeleton_Data, int) {

	client, err := GetClient()

	if err != nil {
		panic(err)
	}

	var formulas []models.Formula_Skeleton_Data
	for i := id; i < id+size; i++ {
		var formula bson.M
		collection := client.Database("CFOP").Collection(method)
		err = collection.FindOne(context.TODO(), bson.M{"_id": i}).Decode(&formula)
		if err != nil {
			panic(err)
		}

		var formulaOBJ models.Formula_Skeleton_Data
		bsonBytes, _ := bson.Marshal(formula)
		bson.Unmarshal(bsonBytes, &formulaOBJ)

		formulas = append(formulas, formulaOBJ)
	}

	return formulas, id + size
}
