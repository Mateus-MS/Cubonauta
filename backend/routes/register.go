package routes

import (
	"Cubonauta/utils"
	"net/http"
	"strings"
)

func RegisterRoute(w http.ResponseWriter, h *http.Request) {
	if strings.Contains(h.UserAgent(), "Windows") {
		utils.RenderTemplate([]string{"../frontend/desktop/pages/learn/learn_formulas.html"}, w, 0)
	}

	if strings.Contains(h.UserAgent(), "Mobile") {
		utils.RenderTemplate([]string{"../frontend/mobile/pages/register/register.html"}, w, 0)
	}
}
