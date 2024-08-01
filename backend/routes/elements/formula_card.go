package custom_routes_elements

import (
	"Cubonauta/db"
	routes_query "Cubonauta/routes/query"
	"Cubonauta/utils"
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

	var id int = utils.ConvertStringToInt(routes_query.QueryURL("id", r))
	var valids = routes_query.QueryURL("valids", r)

	formula_card_data := db.GetFormulaCard("F2L", id, valids)

	template, _ := template.ParseFiles("./elements/card.html")

	template.Execute(w, formula_card_data)

}
