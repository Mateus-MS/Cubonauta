package custom_routes

import (
	"Cubonauta/db"
	"Cubonauta/query"
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

	var id int = query.ID_Query(r)
	var size int = query.Size_Resolve(r)

	formula, new_id := db.GetFormula("F2L", id, size)

	w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, new_id))

	fmt.Println(formula)

	template := template.Must(
		template.New("card--skeleton.html").Funcs(
			template.FuncMap{"repeat": func(times int) []int {
				return make([]int, times)
			}},
		).ParseFiles("./elements/card--skeleton.html"),
	)

	template.Execute(w, formula)

}
