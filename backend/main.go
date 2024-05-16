package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
)

type Formula struct {
	Formula string   `json:"formula"`
	Tags    []string `json:"tags"`
}

type Formulas struct {
	Formulas []Formula `json:"formulas"`
}

var formulas Formulas

func main() {

	router := http.NewServeMux()

	OpenFormulasFile(&formulas)

	router.HandleFunc("/api/formulas", FormulaCard)

	if err := http.ListenAndServe(":8080", router); err != nil {
		fmt.Println(err.Error())
	}

}

func FormulaCard(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "hx-current-url, hx-request")

	if r.Method == "GET" {

		id := r.URL.Query().Get("id")

		if id == "" {
			fmt.Fprint(w, formulas.Formulas)
		} else {
			idInt, err := strconv.Atoi(id)
			if err == nil {
				fmt.Fprint(w, formulas.Formulas[idInt])
			}
		}

	}

}

func OpenFormulasFile(formulas *Formulas) {
	formulasFile, err := os.Open("../data/formulas.json")

	if err != nil {
		fmt.Println(err)
	}

	formulasByteJSON, _ := io.ReadAll(formulasFile)

	json.Unmarshal(formulasByteJSON, formulas)
	defer formulasFile.Close()
}
