package query

import (
	"net/http"
	"strconv"
)

func ID_Query(r *http.Request) int {
	var id_string string = r.URL.Query().Get("id")
	id_int, err := strconv.Atoi(id_string)
	if err != nil {
		return -1
	}
	return id_int
}
