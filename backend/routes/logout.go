package routes

import (
	"Cubonauta/cluster"
	"Cubonauta/session"
	"fmt"
	"net/http"
	"time"
)

func LogOutRoute(w http.ResponseWriter, r *http.Request) {
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
