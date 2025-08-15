<script>
	// @ts-nocheck
	import { sendResetPasswordEmail } from '$lib/firebase/auth.client';
	import messageStore from '../../storage/message.store';

	/**
	 * @param {SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }} event
	 */
	async function handleReset(event) {
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');

		if (!email) {
			messageStore.showError('Email is required');
			return;
		}

		try {
			await sendResetPasswordEmail(email);

			messageStore.showSuccess('Password reset email sent successfully');
		} catch (error) {
			console.log(error);

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
	<title>Password Reset - Book Lovers</title>
</svelte:head>

<div class="row mt-5 justify-content-center">
	<div class="col-md-6">
		<h1>Forgot Password</h1>
		<hr />
		<form on:submit|preventDefault={handleReset}>
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

			<button type="submit" class="btn btn-success w-100">Send Email</button>
		</form>
	</div>
</div>
