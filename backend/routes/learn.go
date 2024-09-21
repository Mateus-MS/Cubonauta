package routes

import (
	"html/template"
	"net/http"
	"strings"
)

func LearnRoute(w http.ResponseWriter, h *http.Request) {

	if strings.Contains(h.UserAgent(), "Windows") {
		page, err := template.ParseFiles("../frontend/desktop/pages/learn/learn_formulas.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		if err := page.Execute(w, nil); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}

	if strings.Contains(h.UserAgent(), "Mobile") {
		page, err := template.ParseFiles("../frontend/mobile/pages/learn/learn_formulas.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		if err := page.Execute(w, nil); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}

}
