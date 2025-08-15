<script>
	// @ts-nocheck
	import { signinWithEmail } from '$lib/firebase/auth.client';
	import LoginWithGoogle from '../../components/Auth/LoginWithGoogle.svelte';
	import messageStore from '../../storage/message.store';

	/**
	 * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
	 */
	async function handleLogin(event) {
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			messageStore.showError('Email & Password is required');
			return;
		}

		try {
			// @ts-ignore
			const user = await signinWithEmail(email, password);
		} catch (error) {
			if (error.code === 'auth/invalid-credential') {
				messageStore.showError('Invalid credentials');
			} else {
				messageStore.showError('Login failed. Please try again.');
			}
			return;
		}
	}
</script>

<svelte:head>
	<title>Login - Book Lovers</title>
</svelte:head>

<div class="row mt-5 justify-content-center">
	<div class="col-md-6">
		<h1>Login</h1>
		<hr />
		<LoginWithGoogle />
		<form on:submit|preventDefault={handleLogin}>
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input
					type="email"
					name="email"
					class="form-control"
					id="email"
					placeholder="Email"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					name="password"
					class="form-control"
					id="password"
					placeholder="*********"
				/>
			</div>
			<button type="submit" class="btn btn-success w-100">Login</button>
		</form>
	</div>
</div>
