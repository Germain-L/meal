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
	"github.com/joho/godotenv"
)

var env = os.Getenv("ENV")

func setupLogger() {
	log.Default().SetOutput(os.Stdout)
}

func Connect(ctx context.Context) *db.Queries {
	if env == "development" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	connString := os.Getenv("DATABASE_URL")
	log.Printf("Connecting to database: %s\n", connString)
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

	// Protected routes
	protectedMux := http.NewServeMux()
	protectedMux.HandleFunc("/user", h.GetUserAccount)
	protectedHandler := middleware.AuthMiddleware(protectedMux)

	// Combine handlers
	mainHandler := http.NewServeMux()
	mainHandler.Handle("/", mux)
	mainHandler.Handle("/user", protectedHandler)

	// Apply middlewares in order: CORS -> Logging
	handler := middleware.CorsMiddleware(mainHandler)
	return middleware.LoggingMiddleware(handler)
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

	log.Printf("Starting server in %s mode", env)

	go startServer(server)
	gracefulShutdown(server)
}
