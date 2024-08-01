package custom_routes_elements

import (
	"Cubonauta/db"
	"Cubonauta/models"
	routes_query "Cubonauta/routes/query"
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"text/template"
)

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

	var id int = routes_query.ID_Query(r)
	var filters []string = routes_query.Filters_Query(r)
	var card_skeleton models.Card_Skeleton

	if len(filters) == 1 && filters[0] == "" {
		formulas := db.GetFormula("F2L", id)
		card_skeleton = utils.ConvertCaseToCard_Skeleton(formulas)
	} else {
		//Must Have at least one of the passed filters to be returned
		formulas := db.GetFormulaFiltred("F2L", id, filters)
		card_skeleton = utils.ConvertCaseToCard_Skeleton(formulas)
	}

	//w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, new_id))

	template := template.Must(
		template.New("card--skeleton.html").Funcs(
			template.FuncMap{"repeat": func(times int) []int {
				return make([]int, times)
			}},
		).ParseFiles("./elements/card--skeleton.html"),
	)

	template.Execute(w, card_skeleton)

}
