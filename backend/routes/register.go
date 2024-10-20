package routes

import (
	"Cubonauta/cluster"
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"strings"
)

func RegisterRoute(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if strings.Contains(r.UserAgent(), "Windows") {
			utils.RenderTemplate([]string{"../frontend/desktop/pages/learn/learn_formulas.html"}, w, 0)
		}

		if strings.Contains(r.UserAgent(), "Mobile") {
			utils.RenderTemplate([]string{"../frontend/mobile/pages/register/register.html"}, w, 0)
		}
	}

	if r.Method == "POST" {
		user, pass := getValuesFromForm(r)

		if status := cluster.CreateUser(user, pass); status == nil {
			fmt.Println("Registrado com sucesso")
		} else {
			er := http.StatusUnauthorized
			http.Error(w, "User already registered!", er)
		}
	}
}

func getValuesFromForm(r *http.Request) (string, string) {
	user := r.FormValue("user")
	pass := r.FormValue("pass")

	return user, pass
}
