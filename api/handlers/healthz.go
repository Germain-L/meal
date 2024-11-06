package handlers

import (
	"encoding/json"
	"net/http"
)

func (h Handler) Healthz(w http.ResponseWriter, r *http.Request) {
	_, err := h.Queries.HealthCheck(r.Context())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"status": "unhealthy",
			"error":  err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"status": "healthy",
	})
}
