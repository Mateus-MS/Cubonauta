package routes

import (
	"Cubonauta/utils"
	"net/http"
	"strings"
)

func TestRegister(w http.ResponseWriter, h *http.Request) {
	if strings.Contains(h.UserAgent(), "Mobile") {
		utils.RenderTemplate([]string{"../tests/RegisterCarrossel/index.html"}, w, 0)
	}
}
