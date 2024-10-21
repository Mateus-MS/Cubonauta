package components

import (
	"Cubonauta/cluster"
	"Cubonauta/session"
	"Cubonauta/utils"
	"net/http"
	"strings"
)

func Component(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "https://cubonauta.com")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, X-CSRF-Token")
	w.Header().Set("Access-Control-Expose-Headers", "X-CSRF-Token")

	//Resolve pre-flight
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var componentName string = strings.TrimPrefix(r.URL.Path, "/components/")

	if componentName == "case_card" {
		Case_card(w, r)
		return
	}

	if componentName == "filter_tags" {
		if strings.Contains(r.UserAgent(), "Mobile") {
			utils.RenderTemplate[[]string]([]string{"./components/filter_tags/mobile.html"}, w, cluster.GetFilters())
		}
		return
	}

	if componentName == "post" {
		Post(w, r)
		return
	}

	if componentName == "hotbar/profile" {
		var isLogged bool = true

		if err := session.Authorize(r); err != nil {
			isLogged = false
		}

		if strings.Contains(r.UserAgent(), "Mobile") {
			utils.RenderTemplate([]string{"./components/hotbarProfile/profile.html"}, w, isLogged)
		}
		return
	}

}
