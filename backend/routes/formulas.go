package rotas

import (
	data "cubonauta/driver"
	"fmt"
	"net/http"
	"strconv"
)

func FormulaCard(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	formulas := data.GetFormulas()

	if r.Method == "GET" {

		id := r.URL.Query().Get("id")

		//Se não foi passado um ID
		if id == "" {
			fmt.Fprint(w, formulas)
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
		element :=
			`<div class='card'>
				<span>%s</span>
			</div>`

		fmt.Fprintf(w, element, formulas.Formulas[idInt].Formula)

	}

}
