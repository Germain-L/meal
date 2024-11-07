import { goto } from '$app/navigation';
import { authApi, userApi } from '$lib/api';
import { auth } from '$lib/stores/auth';
import type { LoginRequest, SignupRequest } from '$lib/api-client';

export class AuthService {
	static async login(credentials: LoginRequest) {
		auth.setLoading(true);
		auth.setError(null);

		try {
			// Login
			await authApi.loginPost({ loginRequest: credentials });

			// Get user profile
			const user = await userApi.userGet();
			auth.setUser(user);

			goto('/dashboard');
		} catch (err: any) {
			let errorMsg = 'An error occurred during sign in';

			if (err.response) {
				const text = await err.response.text();
				try {
					const json = JSON.parse(text);
					errorMsg = json.error || errorMsg;
				} catch {
					errorMsg = text || errorMsg;
				}
			}

			auth.setError(errorMsg);
			throw err;
		} finally {
			auth.setLoading(false);
		}
	}

	static async signup(data: SignupRequest) {
		auth.setLoading(true);
		auth.setError(null);

		try {
			// Create account
			const user = await authApi.signupPost({ signupRequest: data });

			// Login automatically
			await this.login({
				username: data.username,
				password: data.password
			});

			auth.setUser(user);
			goto('/dashboard');
		} catch (err: any) {
			let errorMsg = 'An error occurred during sign up';

			if (err.response) {
				const text = await err.response.text();
				try {
					const json = JSON.parse(text);
					errorMsg = json.error || errorMsg;
				} catch {
					errorMsg = text || errorMsg;
				}
			}

			auth.setError(errorMsg);
			throw err;
		} finally {
			auth.setLoading(false);
		}
	}

	static async logout() {
		auth.reset();
		goto('/auth');
	}

	static async checkAuth() {
		try {
			const user = await userApi.userGet();
			auth.setUser(user);
			return true;
		} catch {
			auth.reset();
			return false;
		}
	}
}
