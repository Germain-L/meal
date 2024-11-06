<script lang="ts">
	import { authApi } from '$lib/api';
	import { LoginRequestFromJSON, ResponseError, SignupRequestFromJSON } from '$lib/api-client';

	let isSignUp = false;

	function toggleAuthMode() {
		isSignUp = !isSignUp;
	}

	let name = '';
	let email = '';
	let password = '';
	let error = '';

	const signin = async () => {
		try {
			const loginRequest = LoginRequestFromJSON({ username: email, password });
			await authApi.loginPost({ loginRequest });
			// Handle successful sign in
		} catch (err) {
			if (err instanceof ResponseError) {
				const responseText = await err.response.text();
				try {
					const errorContext = JSON.parse(responseText);
					error = errorContext.error || 'An error occurred during sign in.';
				} catch {
					error = responseText || 'An error occurred during sign in.';
				}
			} else {
				error = 'An unexpected error occurred.';
			}
		}
	};

	const signup = async () => {
		try {
			const signupRequest = SignupRequestFromJSON({ name, username: email, password });
			await authApi.signupPost({ signupRequest });
			// Handle successful sign up
		} catch (err) {
			if (err instanceof ResponseError) {
				const responseText = await err.response.text();
				try {
					const errorContext = JSON.parse(responseText);
					error = errorContext.error || 'An error occurred during sign up.';
				} catch {
					error = responseText || 'An error occurred during sign up.';
				}
			} else {
				error = 'An unexpected error occurred.';
			}
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h2 class="mb-6 text-center text-2xl font-bold">
			{#if isSignUp}
				Sign Up
			{:else}
				Sign In
			{/if}
		</h2>
		{#if error}
			<div class="mb-4 text-red-500">
				{error}
			</div>
		{/if}
		<form>
			{#if isSignUp}
				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="name">Name</label>
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="name"
						type="text"
						placeholder="Name"
						bind:value={name}
					/>
				</div>
			{/if}
			<div class="mb-4">
				<label class="mb-2 block text-sm font-bold text-gray-700" for="email">Email</label>
				<input
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="email"
					type="email"
					placeholder="Email"
					bind:value={email}
				/>
			</div>
			<div class="mb-6">
				<label class="mb-2 block text-sm font-bold text-gray-700" for="password">Password</label>
				<input
					class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="password"
					type="password"
					placeholder="Password"
					bind:value={password}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
					type="button"
					on:click={isSignUp ? signup : signin}
				>
					{#if isSignUp}
						Sign Up
					{:else}
						Sign In
					{/if}
				</button>
				<button
					class="inline-block cursor-pointer align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
					on:click={toggleAuthMode}
				>
					{#if isSignUp}
						Already have an account? Sign In
					{:else}
						Don't have an account? Sign Up
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
