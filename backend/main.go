package main

import (
	custom_routes "Cubonauta/routes"
	"fmt"
	"net/http"
)

func main() {

	router := http.NewServeMux()

	router.HandleFunc("/test", custom_routes.Skeleton)

	if err := http.ListenAndServe(":8080", router); err != nil {
		fmt.Println(err.Error())
	}

}
