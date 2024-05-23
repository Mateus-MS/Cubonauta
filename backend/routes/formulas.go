package rotas

import (
	data "cubonauta/driver"
	"fmt"
	"net/http"
)

func FormulasCFOP(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Expose-Headers", "*")

	if r.Method != "GET" && r.Method != "OPTIONS" {
		return
	}

	var category string = CategoryResolve(r)
	var formulas = data.GetFormulas(category)

	var id int = IdResolve(r, len(formulas.Formulas))
	if id == -2 {
		return
	}
	var size int = SizeResolve(r)
	var filters []string = FiltersResolve(r)

	var searchResult Search = SearchFormulas(id, size, filters, formulas)

	w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, searchResult.cursor))
	fmt.Fprint(w, searchResult.html)

}
