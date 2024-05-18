package rotas

import (
	"fmt"
	"net/http"
)

func Test(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method == "GET" {

		fmt.Fprintln(w, "TESTING POURPOSES")

	}

}
