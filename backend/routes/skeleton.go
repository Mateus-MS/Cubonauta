package custom_routes

import (
	"Cubonauta/db"
	"Cubonauta/query"
	"fmt"
	"net/http"
	"text/template"
)

type Skeleton_Data struct {
	ID             int32    `bson:"_id,omitempty"   json:"id"`
	Name           string   `bson:"Name"            json:"name"`
	Formula        string   `bson:"Formula"         json:"formula"`
	FormulaReverse string   `bson:"Formula_Reverse" json:"formula_reverse"`
	FormulaArray   []string `bson:"Formula_Array"   json:"formula_array"`
}

func Skeleton(w http.ResponseWriter, r *http.Request) {

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

	var id int = query.ID_Query(r)

	formula := db.GetFormula("F2L", id)

	template, _ := template.ParseFiles("./elements/card--skeleton.html")
	template.Execute(w, formula)

}
