<script lang="ts">
	import { AuthService } from '$lib/services/auth';
	import { auth } from '$lib/stores/auth';

	let isSignUp = false;
	let username = '';
	let email = '';
	let password = '';

	const toggleAuthMode = () => {
		isSignUp = !isSignUp;
		$auth.error = null;
	};

	const handleSubmit = async () => {
		try {
			if (isSignUp) {
				await AuthService.signup({
					username,
					email,
					password
				});
			} else {
				await AuthService.login({
					email,
					password
				});
			}
		} catch (err) {
			// Error is handled by AuthService
			console.error('Auth error:', err);
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h2 class="mb-6 text-center text-2xl font-bold">
			{isSignUp ? 'Sign Up' : 'Sign In'}
		</h2>

		{#if $auth.error}
			<div class="mb-4 rounded bg-red-100 p-3 text-red-700">
				{$auth.error}
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit}>
			{#if isSignUp}
				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="name"> Name </label>
					<input
						bind:value={username}
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="name"
						type="text"
						placeholder="Name"
						required
					/>
				</div>
			{/if}

			<div class="mb-4">
				<label class="mb-2 block text-sm font-bold text-gray-700" for="email"> Email </label>
				<input
					bind:value={email}
					class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="email"
					type="email"
					placeholder="Email"
					required
				/>
			</div>

			<div class="mb-6">
				<label class="mb-2 block text-sm font-bold text-gray-700" for="password"> Password </label>
				<input
					bind:value={password}
					class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="password"
					type="password"
					placeholder="Password"
					required
				/>
			</div>

			<div class="flex items-center justify-between">
				<button
					class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
					type="submit"
					disabled={$auth.loading}
				>
					{#if $auth.loading}
						<span class="inline-block animate-spin">↻</span>
					{:else}
						{isSignUp ? 'Sign Up' : 'Sign In'}
					{/if}
				</button>

				<button
					type="button"
					class="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
					on:click={toggleAuthMode}
					disabled={$auth.loading}
				>
					{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
				</button>
			</div>
		</form>
	</div>
</div>
