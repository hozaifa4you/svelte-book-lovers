<script>
	// @ts-nocheck
	import { registerWithEmail } from '$lib/firebase/auth.client';
	import LoginWithGoogle from '../../components/Auth/LoginWithGoogle.svelte';
	import messageStore from '../../storage/message.store';

	/**
	 * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
	 */
	async function handleRegister(event) {
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			messageStore.showError('Email & Password is required');

			return;
		}

		try {
			// @ts-ignore
			const user = await registerWithEmail(email, password);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				messageStore.showError('Email is already in use');
			} else if (error.code === 'auth/invalid-email') {
				messageStore.showError('Invalid email address');
			} else if (error.code === 'auth/weak-password') {
				messageStore.showError('Password should be at least 6 characters long');
			} else {
				messageStore.showError('Registration failed. Please try again.');
			}
			return;
		}
	}
</script>

<svelte:head>
	<title>Register - Book Lovers</title>
</svelte:head>

<div class="row justify-content-center">
	<h1>Register</h1>

	<div class="col-md-6">
		<form on:submit|preventDefault={handleRegister}>
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
			<button type="submit" class="btn btn-success w-100">Register</button>
		</form>
	</div>
	<div class="w-100 mt-2 d-flex">
		<LoginWithGoogle />
	</div>
</div>
