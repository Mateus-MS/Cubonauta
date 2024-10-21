package routes

import (
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"strings"
)

func ProfileRoute(w http.ResponseWriter, h *http.Request) {
	if strings.Contains(h.UserAgent(), "Windows") {
		fmt.Println("Home in windows")
	}

	if strings.Contains(h.UserAgent(), "Mobile") {
		utils.RenderTemplate([]string{"../frontend/mobile/pages/profile/profile.html"}, w, 0)
	}
}
