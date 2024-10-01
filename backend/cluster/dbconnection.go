package cluster

import (
	"context"
	"fmt"
	"log"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/joho/godotenv"
)

type DB_Conn struct {
	Cli *mongo.Client
}

var instance *DB_Conn
var once sync.Once

// Works as a private constructor in a Singleton
func startConnection() *DB_Conn {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	connStr := fmt.Sprintf("mongodb+srv://%s:%s@main.ifzu4vt.mongodb.net/?retryWrites=true&w=majority&appName=main", user, pass)
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(connStr))

	if err != nil {
		log.Fatal("Error while trying to connecto to DB")
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
