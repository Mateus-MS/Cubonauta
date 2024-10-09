package utils

import (
	"html/template"
	"net/http"
)

func RenderTemplate[Data any](path []string, w http.ResponseWriter, data Data) {
	template := template.Must(template.ParseFiles(path...))
	template.Execute(w, data)
}
