package handlers

import (
	"encoding/json"
	"net/http"
)

// @Summary Ping endpoint
// @Description Returns a simple pong message
// @Tags health
// @Produce json
// @Success 200 {object} map[string]string
// @Router /ping [get]
func (h Handler) Ping(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{"message": "pong"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
