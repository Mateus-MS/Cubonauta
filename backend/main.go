package main

import (
	"Cubonauta/components"
	"Cubonauta/routes"
	"fmt"
	"net/http"

	/*TEMPORARIO*/
	"golang.org/x/crypto/acme/autocert"
)

func main() {

	router := http.NewServeMux()

	//Serve the js and css files to mobile
	router.Handle("/static/mobile/", http.StripPrefix("/static/mobile/", http.FileServer(http.Dir("../frontend/mobile"))))
	//Serve the js and css files to desktop
	router.Handle("/static/desktop/", http.StripPrefix("/static/desktop/", http.FileServer(http.Dir("../frontend/desktop"))))

	//Serve the js and css files to desktop
	router.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../frontend/static"))))

	router.HandleFunc("/", routes.LearnRoute)

	//components Handle

	router.HandleFunc("/components/case_card", components.Case_card)
	router.HandleFunc("/components/filter_tags", components.Filter_tags)

	startServer(router)

}

func startServer(router *http.ServeMux) {
	/*TEMPORARIO*/
	certManager := &autocert.Manager{
		Prompt:     autocert.AcceptTOS,                      // Automatically accept the Let's Encrypt Terms of Service
		Cache:      autocert.DirCache("certs"),              // Directory to store the certificates
		HostPolicy: autocert.HostWhitelist("cubonauta.com"), // Replace with your domain name
	}

	go func() {
		httpServer := &http.Server{
			Addr:    ":80",
			Handler: certManager.HTTPHandler(nil), // Use certManager to handle HTTP-01 challenges
		}
		fmt.Println("Starting HTTP server on port 80 for certificate challenges and redirection to HTTPS")
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("HTTP server error: %s", err)
		}
	}()

	// Start the HTTPS server
	httpsServer := &http.Server{
		Addr:      ":443",
		Handler:   router,
		TLSConfig: certManager.TLSConfig(),
	}

	fmt.Println("Starting HTTPS server on port 443")
	if err := httpsServer.ListenAndServeTLS("", ""); err != nil {
		fmt.Println("HTTPS server error:", err)
	}
}
