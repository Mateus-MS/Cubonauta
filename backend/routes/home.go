package routes

import (
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"strings"
)

func HomeRoute(w http.ResponseWriter, h *http.Request) {
	if strings.Contains(h.UserAgent(), "Windows") {
		fmt.Println("Home in windows")
	}

	if strings.Contains(h.UserAgent(), "Mobile") {
		utils.RenderTemplate([]string{"../frontend/mobile/pages/feed/home.html"}, w, 0)
	}
}
