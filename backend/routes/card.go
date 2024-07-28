package custom_routes

import (
	"Cubonauta/models"
	"Cubonauta/query"
	"fmt"
	"net/http"
	"text/template"
)

func FormulaCard(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Expose-Headers", "*")

	if r.Method != "GET" && r.Method != "OPTIONS" {
		return
	}

	//Resolve the pre-flight
	if r.Method == "OPTIONS" {
		fmt.Fprint(w)
		return
	}

	var name = query.QueryURL("name", r)
	var formula = query.QueryURL("formula", r)

	formula_card_data := models.Formula_Data{
		Name:    name,
		Formula: formula,
	}

	fmt.Println(formula_card_data)

	template, _ := template.ParseFiles("./elements/card.html")

	template.Execute(w, formula_card_data)

}
