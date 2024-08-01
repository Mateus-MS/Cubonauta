package routes_query

import (
	"net/http"
	"strings"
)

func Filters_Query(r *http.Request) []string {
	var filters_string string = r.URL.Query().Get("filters")
	var filters []string = strings.Split(filters_string, ":")

	return filters
}
