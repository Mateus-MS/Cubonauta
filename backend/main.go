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
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method == "GET" {

		id := r.URL.Query().Get("id")

		//Se não foi passado um ID
		if id == "" {
			fmt.Fprint(w, formulas.Formulas)
			return
		}

		//Se foi passado um ID -> converte de string para int
		idInt, err := strconv.Atoi(id)
		//Se não houver erros de converção
		if err != nil {
			return
		}

		//Se o ID esta no range da lista de formulas
		if idInt > len(formulas.Formulas)-1 {
			return
		}

		//Adiciona ao body da resposta o elemento HTML com a formula
		fmt.Fprintf(w,
			`<div class='card'>
				<span>%s</span>
			</div>`, formulas.Formulas[idInt].Formula)

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
