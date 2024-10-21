package routes

import (
	"Cubonauta/cluster"
	"Cubonauta/session"
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"strings"
	"time"
)

func UserRoute(w http.ResponseWriter, r *http.Request) {

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

	var action string = strings.TrimPrefix(r.URL.Path, "/user/")

	fmt.Println(action)

	switch action {
	case "register":
		register(w, r)
	case "login":
		login(w, r)
	case "logout":
		logout(w, r)
	case "check":
		check()
	default:
		fmt.Println("This endpoint does not exist in users")
	}
}

func check() {

}

func logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not Allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := session.Authorize(r); err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	//Check if the user exist
	// Retrieve the username from the cookie
	usernameCookie, err := r.Cookie("username")
	if err != nil || usernameCookie == nil {
		return
	}
	username := usernameCookie.Value

	user, err := cluster.SearchUser(username)
	if err != nil {
		fmt.Println("User did not exist")
		return
	}

	//Clear cookies
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	})

	http.SetCookie(w, &http.Cookie{
		Name:     "csrf_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: false,
	})
	// Store username in a cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "username",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	})

	//Att the DB
	user.SessionToken = ""
	user.CSRFToken = ""
	cluster.AttUser(username, user)
}

func login(w http.ResponseWriter, r *http.Request) {
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

func register(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if strings.Contains(r.UserAgent(), "Windows") {
			utils.RenderTemplate([]string{"../frontend/desktop/pages/learn/learn_formulas.html"}, w, 0)
		}

		if strings.Contains(r.UserAgent(), "Mobile") {
			utils.RenderTemplate([]string{"../frontend/mobile/pages/register/register.html"}, w, 0)
		}
	}

	if r.Method == "POST" {
		user := r.FormValue("user")
		pass := r.FormValue("pass")

		if status := cluster.CreateUser(user, pass); status == nil {
			fmt.Println("Registrado com sucesso")
		} else {
			er := http.StatusUnauthorized
			http.Error(w, "User already registered!", er)
		}
	}
}
