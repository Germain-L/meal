<script>
	let isSignUp = false;

	function toggleAuthMode() {
		isSignUp = !isSignUp;
	}
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
		<form>
			{#if isSignUp}
				<div class="mb-4">
					<label class="mb-2 block text-sm font-bold text-gray-700" for="name">Name</label>
					<input
						class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
						id="name"
						type="text"
						placeholder="Name"
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
				/>
			</div>
			<div class="mb-6">
				<label class="mb-2 block text-sm font-bold text-gray-700" for="password">Password</label>
				<input
					class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					id="password"
					type="password"
					placeholder="Password"
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
					type="button"
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
