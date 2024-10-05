package utils

import (
	"fmt"
	"html/template"
	"net/http"
)

func RenderTemplate[Data any](path string, w http.ResponseWriter, data Data) {
	template, err := template.ParseFiles(path)
	if err != nil {
		fmt.Println(err)
	}

	template.Execute(w, data)
}
