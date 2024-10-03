package filter_tags

import (
	"Cubonauta/cluster"
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

func Filter_tags(w http.ResponseWriter, r *http.Request) {

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

	if strings.Contains(r.UserAgent(), "Mobile") {
		// Render the template
		template, err := template.ParseFiles("./components/filter_tags/mobile.html")
		if err != nil {
			fmt.Println(err)
		}
		template.Execute(w, cluster.GetFilters())
	}

}
