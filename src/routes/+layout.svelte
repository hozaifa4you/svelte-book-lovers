<script>
	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import Navbar from '../components/Navbar.svelte';
	import Alert from '../components/ui/Alert.svelte';
	import messageStore from '../storage/message.store';
	import '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import { sendJWTToken } from '$lib/firebase/auth.client';

	/**
	 * @type {string | number | NodeJS.Timeout | undefined}
	 */
	let interval;

	let { children } = $props();

	async function sendServerToken() {
		try {
			await sendJWTToken();
		} catch (error) {
			console.log(error);
			clearInterval(interval);
			messageStore.showError();
		}
	}

	onMount(() => {
		async function initializeAuth() {
			try {
				await sendServerToken();
				interval = setInterval(sendServerToken, 60 * 1000 * 10);
			} catch (error) {
				console.log(error);
				messageStore.showError();
			}
		}

		initializeAuth();

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main class="container">
	{#if $messageStore.show}
		<Alert message={$messageStore.message} type={$messageStore.type} />
	{/if}
	{@render children?.()}
</main>
