package components

import (
	"Cubonauta/session"
	"Cubonauta/utils"
	"net/http"
	"strings"
)

func HotBarProfile(w http.ResponseWriter, r *http.Request) {

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

	var isLogged bool = true

	if err := session.Authorize(r); err != nil {
		isLogged = false
	}

	if strings.Contains(r.UserAgent(), "Mobile") {
		utils.RenderTemplate([]string{"./components/hotbarProfile/profile.html"}, w, isLogged)
	}

}
