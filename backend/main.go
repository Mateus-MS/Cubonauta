package main

import (
	"fmt"
	"net/http"

	components "Cubonauta/components/case_card"
	"Cubonauta/routes"
)

func main() {

	router := http.NewServeMux()

	//Serve the js and css files to mobile
	router.Handle("/static/mobile/", http.StripPrefix("/static/mobile/", http.FileServer(http.Dir("../frontend/mobile"))))
	//Serve the js and css files to desktop
	router.Handle("/static/desktop/", http.StripPrefix("/static/desktop/", http.FileServer(http.Dir("../frontend/desktop"))))

	//Serve the js and css files to desktop
	router.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../frontend/static"))))

	router.HandleFunc("/learn", routes.LearnRoute)

	//components Handle

	router.HandleFunc("/components/case_card", components.Case_card)

	startServer(router)

}

func startServer(router *http.ServeMux) {
	if err := http.ListenAndServe(":80", router); err != nil {
		fmt.Println(err.Error())
	}
}
