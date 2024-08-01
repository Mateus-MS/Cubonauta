package routes_query

import (
	"net/http"
)

func QueryURL(param string, r *http.Request) string {

	var str string = r.URL.Query().Get(param)
	return str

}
