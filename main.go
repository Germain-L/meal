package main

import (
	"context"
	"log"
	"meals/db"
	"meals/handlers"
	"meals/middleware"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect(ctx context.Context) *db.Queries {
	connString := os.Getenv("DATABASE_URL")
	pool, err := pgxpool.New(ctx, connString)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v\n", err)
	}

	queries := db.New(pool)
	return queries
}

func main() {
	log.Default().SetOutput(os.Stdout)

	// Create a new ServeMux
	mux := http.NewServeMux()
	queries := Connect(context.Background())

	h := handlers.NewHandler(queries)

	// Register your handlers
	mux.HandleFunc("/healthz", h.Healthz)
	mux.HandleFunc("/ping", h.Ping)

	// Wrap the mux with the middleware
	handler := middleware.LoggingMiddleware(mux)

	// Create an http.Server
	server := &http.Server{
		Addr:    ":8080",
		Handler: handler,
	}

	// Run the server in a goroutine
	go func() {
		log.Printf("Listening on port %s", "8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("ListenAndServe(): %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// Create a context with timeout for the shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Shutdown the server
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown: %v", err)
	}

	log.Println("Server exited properly")
}
