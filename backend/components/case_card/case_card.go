package components

import (
	"Cubonauta/cluster"
	"Cubonauta/models"
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"text/template"

	"go.mongodb.org/mongo-driver/bson"
)

func Case_card(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "https://cubonauta.com")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, X-CSRF-Token")
	w.Header().Set("Access-Control-Expose-Headers", "X-CSRF-Token")

	//Resolve pre-flight
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if strings.Contains(r.UserAgent(), "Mobile") {

		cli := cluster.GetInstance()

		database := cli.Cli.Database("CFOP")
		collection := database.Collection("F2L")

		filter := bson.D{{"_id", getUrlCaseIndex(r)}}

		var result models.Case

		err := collection.FindOne(context.TODO(), filter).Decode(&result)

		if err != nil {
			fmt.Println(err)
		}

		// Render the template
		template, err := template.ParseFiles("./components/case_card/mobile.html")
		if err != nil {
			fmt.Println(err)
		}
		template.Execute(w, result)
	}

	if strings.Contains(r.UserAgent(), "Windows") {
		template, _ := template.ParseFiles("./components/case_card/desktop.html")
		template.Execute(w, nil)
	}

}

func getUrlCaseIndex(r *http.Request) int {

	string_index := r.URL.Query().Get("case_id")
	index, err := strconv.Atoi(string_index)

	if err != nil {
		fmt.Println("Erro ao converter case index")
	}

	return index

}
