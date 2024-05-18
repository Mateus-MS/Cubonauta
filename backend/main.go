package main

import (
	rotas "cubonauta/routes"
	"fmt"
	"net/http"
)

func main() {

	router := http.NewServeMux()

	router.HandleFunc("/api/formulas", rotas.FormulaCard)

	if err := http.ListenAndServe(":8080", router); err != nil {
		fmt.Println(err.Error())
	}

}
