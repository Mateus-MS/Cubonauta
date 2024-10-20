package session

import (
	"Cubonauta/cluster"
	"errors"
	"fmt"
	"net/http"
)

var AuthError = errors.New("Unauthorized")

func Authorize(r *http.Request) error {
	// Retrieve the username from the cookie
	usernameCookie, err := r.Cookie("username")
	if err != nil || usernameCookie == nil {
		return AuthError
	}
	username := usernameCookie.Value

	user, err := cluster.SearchUser(username)
	if err != nil {
		fmt.Println("User invalid")
		return AuthError
	}

	sessionToken, err := r.Cookie("session_token")
	if err != nil || sessionToken.Value == "" || sessionToken.Value != user.SessionToken {
		fmt.Println("session token invalid")
		return AuthError
	}

	csrfToken := r.Header.Get("X-CSRF-Token")
	if csrfToken != user.CSRFToken || csrfToken == "" {
		fmt.Println("CSRF token invalid")
		return AuthError
	}

	return nil
}
