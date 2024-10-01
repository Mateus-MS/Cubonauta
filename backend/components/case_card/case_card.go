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
	"go.mongodb.org/mongo-driver/mongo"
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

		var id int = getUrlCaseIndex(r)
		var size int = getUrlCaseSize(r)

		count, err := collection.CountDocuments(context.TODO(), bson.D{})
		if err != nil {
			fmt.Println(err)
		}

		//If asking for a formula out of bounds
		if id == int(count) {
			return
		}

		var formula models.Case
		var formulas []models.Case

		for i := 0; i < size; i++ {
			filter := bson.D{{"_id", id}}
			err := collection.FindOne(context.TODO(), filter).Decode(&formula)

			//If formula index bigger than stored ammount
			if err == mongo.ErrNoDocuments {
				break
			}

			//Generic error
			if err != nil {
				fmt.Println(err)
			}

			formulas = append(formulas, formula)
			id += 1
		}

		w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, id))

		// Render the template
		template, err := template.ParseFiles("./components/case_card/mobile.html")
		if err != nil {
			fmt.Println(err)
		}
		template.Execute(w, formulas)
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
		return 0
	}

	return index
}

func getUrlCaseSize(r *http.Request) int {
	string_size := r.URL.Query().Get("size")
	size, err := strconv.Atoi(string_size)

	if err != nil {
		fmt.Println("Erro ao converter case size")
		return 1
	}

	return size
}
