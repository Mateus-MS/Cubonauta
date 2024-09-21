package components

import (
	"fmt"
	"net/http"
	"text/template"
)

func Case_card(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://148.63.246.10")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Expose-Headers", "*")

	if r.Method != "GET" && r.Method != "OPTIONS" {
		return
	}

	//Resolve pre-flight
	if r.Method == "OPTIONS" {
		fmt.Fprint(w)
		return
	}

	template, _ := template.ParseFiles("./components/case_card/case_card.html")
	template.Execute(w, nil)

}
