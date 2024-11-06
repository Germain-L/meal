package middleware

import (
	"log"
	"meals/utils"
	"net/http"
	"os"
	"time"
)

var (
	infoLogger  = log.New(os.Stdout, "[INFO] ", log.LstdFlags)
	errorLogger = log.New(os.Stderr, "[ERROR] ", log.LstdFlags)
)

type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

func isErrorStatus(code int) bool {
	return code >= 400
}

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		rw := &responseWriter{
			ResponseWriter: w,
			statusCode:     http.StatusOK,
		}

		next.ServeHTTP(rw, r)
		end := time.Since(start)

		logEntry := "%s %s %d %s"
		args := []interface{}{
			r.Method,
			r.URL.Path,
			rw.statusCode,
			utils.ConvertTime(end),
		}

		if isErrorStatus(rw.statusCode) {
			errorLogger.Printf(logEntry+" Headers: %v", append(args, r.Header)...)
		} else {
			infoLogger.Printf(logEntry, args...)
		}
	})
}
