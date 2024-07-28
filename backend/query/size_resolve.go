package query

import (
	"net/http"
	"strconv"
)

func Size_Resolve(r *http.Request) int {

	var size_string string = r.URL.Query().Get("size")
	if size_string == "" {
		return 1
	}
	size_int, err := strconv.Atoi(size_string)
	if err != nil {
		return -1
	}
	return size_int

}
