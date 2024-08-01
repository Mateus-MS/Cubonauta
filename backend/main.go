package main

import (
	"Cubonauta/db"
	custom_routes_elements "Cubonauta/routes/elements"
	"context"
	"fmt"
	"net/http"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
)

var MongoClient *mongo.Client

func main() {

	godotenv.Load()

	router := http.NewServeMux()

	router.HandleFunc("/elements/skeleton", custom_routes_elements.Skeleton)
	router.HandleFunc("/elements/formulas", custom_routes_elements.FormulaCard)

	client, err := db.GetClient()
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	startServer(router)

}

func startServer(router *http.ServeMux) {
	if err := http.ListenAndServe(":8080", router); err != nil {
		fmt.Println(err.Error())
	}
}
