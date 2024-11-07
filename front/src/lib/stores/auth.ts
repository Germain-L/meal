import { writable, derived } from 'svelte/store';
import type { User } from '$lib/api-client';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    setUser: (user: User | null) => 
      update(state => ({ ...state, user, isAuthenticated: !!user })),
    setLoading: (loading: boolean) => 
      update(state => ({ ...state, loading })),
    setError: (error: string | null) => 
      update(state => ({ ...state, error })),
    reset: () => set(initialState)
  };
}

export const auth = createAuthStore();
export const isAuthenticated = derived(auth, $auth => $auth.isAuthenticated);