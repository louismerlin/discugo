package main

import (
	"log"
	"net/http"

	"app/discu"
)

func main() {
	log.SetFlags(log.Lshortfile)

	// websocket server

	server := discu.NewServer("/")
	go server.Listen()

	log.Fatal(http.ListenAndServe(":8080", nil))
}
