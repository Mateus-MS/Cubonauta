package routes

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

func LearnRoute(w http.ResponseWriter, h *http.Request) {

	//Serve windows version
	if strings.Contains(h.UserAgent(), "Windows") {
		fmt.Println("Entrando pelo windows")
	}

	if strings.Contains(h.UserAgent(), "Android") {
		page, err := template.ParseFiles("../frontend/mobile/pages/learn/learn_formulas.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		if err := page.Execute(w, nil); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}

}
