package utils

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCollectionSize(collection *mongo.Collection) int64 {
	size, err := collection.CountDocuments(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal("Erro ao pedir o tamanho da lista ao DB")
	}

	return size
}
