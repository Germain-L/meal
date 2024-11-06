package handlers

import (
	"encoding/json"
	"net/http"
)

func (h Handler) GetUserAccount(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the context
	userID := r.Context().Value("user_id").(int32)

	// Get the user account from the database
	user, err := h.Queries.GetUserByID(r.Context(), userID)
	if err != nil {
		http.Error(w, "Could not get user account", http.StatusInternalServerError)
		return
	}

	// Return the user account
	json.NewEncoder(w).Encode(user)
}
