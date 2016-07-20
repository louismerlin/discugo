package main

import (
	"log"
	"net/http"
)

func main() {
	log.SetFlags(log.Lshortfile)

	// static files
	http.Handle("/", http.FileServer(http.Dir("root")))

	log.Fatal(http.ListenAndServe(":8080", nil))
}
