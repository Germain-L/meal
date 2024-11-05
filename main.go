package main

import (
	"meals/handlers"
	"meals/middleware"
	"net/http"
)

func main() {
	// Create a new ServeMux
	mux := http.NewServeMux()

	h := handlers.NewHandler()

	// Register your handlers
	mux.HandleFunc("/ping", h.Ping)

	// Wrap the mux with the middleware
	handler := middleware.LoggingMiddleware(mux)

	// Start the server
	http.ListenAndServe(":8080", handler)
}
