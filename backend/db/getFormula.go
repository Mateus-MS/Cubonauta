package db

import (
	"Cubonauta/models"
	"Cubonauta/utils"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetFormula(method string, id int) models.DB_Case {
	client, err := GetClient()
	if err != nil {
		fmt.Println("Erro na função getClient ao chamar no getFormula")
		panic(err)
	}

	var collection *mongo.Collection = client.Database("CFOP").Collection(method)

	var result bson.M
	collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&result)
	return utils.ConvertBsonToObject(result)
}
