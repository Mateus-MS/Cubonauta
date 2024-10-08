package routes

import (
	"Cubonauta/utils"
	"net/http"
	"strings"
)

func LearnRoute(w http.ResponseWriter, h *http.Request) {
	if strings.Contains(h.UserAgent(), "Windows") {
		utils.RenderTemplate("../frontend/desktop/pages/learn/learn_formulas.html", w, 0)
	}

	if strings.Contains(h.UserAgent(), "Mobile") {
		utils.RenderTemplate("../frontend/mobile/pages/learn/learn_formulas.html", w, 0)
	}
}
