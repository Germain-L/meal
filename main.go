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
	httpSwagger "github.com/swaggo/http-swagger"
)

func setupLogger() {
	log.Default().SetOutput(os.Stdout)
}

func Connect(ctx context.Context) *db.Queries {
	connString := os.Getenv("DATABASE_URL")
	pool, err := pgxpool.New(ctx, connString)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v\n", err)
	}

	queries := db.New(pool)
	return queries
}

func setupRoutes(h *handlers.Handler) http.Handler {
	// Main routes
	mux := http.NewServeMux()
	mux.HandleFunc("/login", h.Login)
	mux.HandleFunc("/signup", h.Signup)
	mux.HandleFunc("/refresh", h.Refresh)
	mux.HandleFunc("/healthz", h.Healthz)
	mux.HandleFunc("/ping", h.Ping)

	// Add Swagger UI for non-prod environments
	if os.Getenv("ENV") != "production" {
		mux.HandleFunc("/swagger/*", httpSwagger.Handler(
			httpSwagger.URL("/swagger/doc.json"),
		))
	}

	// Protected routes
	protectedMux := http.NewServeMux()
	protectedMux.HandleFunc("/user", h.GetUserAccount)
	protectedHandler := middleware.AuthMiddleware(protectedMux)

	// Combine handlers
	mainHandler := http.NewServeMux()
	mainHandler.Handle("/", mux)
	mainHandler.Handle("/user", protectedHandler)

	return middleware.LoggingMiddleware(mainHandler)
}

func createServer(handler http.Handler) *http.Server {
	return &http.Server{
		Addr:    ":8080",
		Handler: handler,
	}
}

func gracefulShutdown(server *http.Server) {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown: %v", err)
	}
	log.Println("Server exited properly")
}

func startServer(server *http.Server) {
	log.Printf("Listening on port %s", "8080")
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("ListenAndServe(): %v", err)
	}
}

func main() {
	setupLogger()

	queries := Connect(context.Background())
	h := handlers.NewHandler(queries)

	handler := setupRoutes(h)
	server := createServer(handler)

	go startServer(server)
	gracefulShutdown(server)
}
