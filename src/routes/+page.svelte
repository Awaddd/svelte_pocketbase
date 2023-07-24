<script lang="ts">
	import { createUser, currentUser, login, logout, registerListener } from '$lib';

	registerListener();

	let mode = 'login';
	const changeMode = (m: 'register' | 'login') => {
		error = null;
		mode = m;
	};

	let email: string;
	let username: string;
	let password: string;
	let confirmPassword: string;
	let error: string | undefined | null;

	const handleLogin = async () => {
		error = await login(email, password);
	};

	const handleRegister = async () => {
		error = await createUser({ email, username, password, confirmPassword });
	};
</script>

<h1 class="title">Hello World!</h1>

<main class="main">
	{#if $currentUser}
		<p>Signed in as {$currentUser.username}</p>
		<button on:click={logout}>Sign out</button>
	{:else if mode === 'login'}
		<form on:submit|preventDefault class="grid">
			<input class="input" placeholder="Email" type="text" bind:value={email} />
			<input class="input" placeholder="Password" type="text" bind:value={password} />

			{#if error}
				<p>{error}</p>
			{/if}

			<button class="text-button" on:click={() => changeMode('register')}>
				Don't have an account?
			</button>

			<button class="button" on:click={handleLogin}>Login</button>
		</form>
	{:else}
		<form on:submit|preventDefault class="grid">
			<input class="input" placeholder="Email" type="text" bind:value={email} />
			<input class="input" placeholder="Name" type="text" bind:value={username} />
			<input class="input" placeholder="Password" type="text" bind:value={password} />
			<input class="input" placeholder="ConfirmPassword" type="text" bind:value={confirmPassword} />

			{#if error}
				<p>{error}</p>
			{/if}

			<button class="text-button" on:click={() => changeMode('login')}>
				Already have an account?
			</button>

			<button class="button" on:click={handleRegister}>Register</button>
		</form>
	{/if}
</main>

<style>
	.title {
		display: block;
		margin: 100px auto;
		max-width: max-content;
	}

	.main {
		max-width: 600px;
		margin: 100px auto;
	}

	.grid {
		display: grid;
		grid-gap: 20px;
	}

	.input {
		padding: 10px;
	}

	.text-button {
		color: white;
		cursor: pointer;
		background-color: transparent;
		border: none;
		margin: 15px 0;
	}

	.button {
		padding: 12px 60px;
		justify-self: center;
		max-width: max-content;
		color: white;
		background-color: blue;
		border: none;
		border-radius: 4px;
	}
</style>
