package routes

import (
	"Cubonauta/session"
	"fmt"
	"net/http"
)

func ProtectedTest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	if err := session.Authorize(r); err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	username := r.FormValue("user")
	fmt.Fprintf(w, "Successfully validated! Welcome %s", username)
}
