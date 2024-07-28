package db

import (
	"context"
	"fmt"
	"sync"

	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var clientInstance *mongo.Client
var clientError error
var mongoOnce sync.Once

func GetClient() (*mongo.Client, error) {
	mongoOnce.Do(func() {
		user := os.Getenv("DB_USER")
		pass := os.Getenv("DB_PASS")
		serverAPI := options.ServerAPI(options.ServerAPIVersion1)
		opts := options.Client().ApplyURI(fmt.Sprintf("mongodb+srv://%s:%s@main.ifzu4vt.mongodb.net/?retryWrites=true&w=majority&appName=main", user, pass)).SetServerAPIOptions(serverAPI)

		client, err := mongo.Connect(context.TODO(), opts)
		if err != nil {
			clientError = err
			return
		}

		if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
			clientError = err
			return
		}

		clientInstance = client
		fmt.Println("Successfully connected to MONGO DB")

	})

	return clientInstance, clientError
}
