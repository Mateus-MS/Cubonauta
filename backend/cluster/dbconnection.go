package cluster

import (
	"context"
	"fmt"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB_Conn struct {
	Cli *mongo.Client
}

var instance *DB_Conn
var once sync.Once

// Works as a private constructor in a Singleton
func startConnection() *DB_Conn {
	connStr := "mongodb+srv://ADM231518:Mk231518.@main.ifzu4vt.mongodb.net/?retryWrites=true&w=majority&appName=main"
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(connStr))

	if err != nil {
		fmt.Println(err)
	}

	return &DB_Conn{Cli: client}
}

// Works as a public method of a Singleton
func GetInstance() *DB_Conn {
	once.Do(func() {
		instance = startConnection()
	})
	return instance
}
