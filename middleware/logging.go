package middleware

import (
	"log"
	"meals/utils"
	"net/http"
	"time"
)

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		end := time.Since(start)
		log.Println(r.Method, r.URL.Path, utils.ConvertTime(end))
	})
}
