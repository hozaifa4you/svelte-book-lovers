<script>
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import { afterLogin } from '$lib/helpers/route.helper';
	import messageStore from '../../storage/message.store';
	import { page } from '$app/state';

	async function signinWithGoogle() {
		try {
			const user = await loginWithGoogle();
			await afterLogin(page.url, user.uid);
		} catch (error) {
			console.log(error);

			messageStore.showError('Login failed. Please try again later.');
		}
	}
</script>

<button class="btn btn-primary" onclick={signinWithGoogle}>Signin with Google</button>
