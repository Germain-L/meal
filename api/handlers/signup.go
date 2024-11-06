package handlers

import (
	"encoding/json"
	"meals/auth"
	"meals/db"
	"net/http"
)

func (h Handler) Signup(w http.ResponseWriter, r *http.Request) {
	var creds struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	hashedPassword, err := auth.HashPassword(creds.Password)
	if err != nil {
		http.Error(w, "Could not hash password", http.StatusInternalServerError)
		return
	}

	user, err := h.Queries.InsertUser(r.Context(), db.InsertUserParams{
		Username:     creds.Username,
		Email:        creds.Email,
		PasswordHash: hashedPassword,
	})
	if err != nil {
		http.Error(w, "Could not create user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(user)
}
