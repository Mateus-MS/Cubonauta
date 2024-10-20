package routes

import (
	"Cubonauta/cluster"
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"strings"
	"time"
)

func LoginRoute(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if strings.Contains(r.UserAgent(), "Windows") {
			utils.RenderTemplate([]string{"../frontend/desktop/pages/learn/learn_formulas.html"}, w, 0)
		}

		if strings.Contains(r.UserAgent(), "Mobile") {
			utils.RenderTemplate([]string{"../frontend/mobile/pages/login/login.html"}, w, 0)
		}
	}

	if r.Method == "POST" {
		username := r.FormValue("user")
		password := r.FormValue("pass")

		//Look for the request name in the DB
		user, err := cluster.SearchUser(username)
		//If not find
		if err != nil || !utils.CheckPassordHash(password, user.HashPass) {
			er := http.StatusUnauthorized
			http.Error(w, "Invalid username or password", er)
			return
		}

		sessionToken := utils.GenerateToken(32)
		csrfToken := utils.GenerateToken(32)

		http.SetCookie(w, &http.Cookie{
			Name:     "session_token",
			Value:    sessionToken,
			Expires:  time.Now().Add(time.Hour),
			HttpOnly: true,
		})

		http.SetCookie(w, &http.Cookie{
			Name:     "csrf_token",
			Value:    csrfToken,
			Expires:  time.Now().Add(time.Hour),
			HttpOnly: false,
		})

		// Store username in a cookie
		http.SetCookie(w, &http.Cookie{
			Name:     "username",
			Value:    username,
			Expires:  time.Now().Add(time.Hour),
			HttpOnly: true,
		})

		user.SessionToken = sessionToken
		user.CSRFToken = csrfToken

		if err := cluster.AttUser(username, user); err != nil {
			fmt.Println("User do not exist")
		} else {
			fmt.Println("Login Successful!")
		}

	}
}
