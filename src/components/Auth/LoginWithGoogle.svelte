<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import messageStore from '../../storage/message.store';

	async function signinWithGoogle() {
		try {
			const user = await loginWithGoogle();
			console.log(user);
		} catch (error) {
			messageStore.showError('Login failed. Please try again later.');
		}
	}
</script>

<button class="btn btn-primary" onclick={signinWithGoogle}>Signin with Google</button>
