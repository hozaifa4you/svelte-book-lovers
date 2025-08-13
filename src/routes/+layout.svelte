<script>
	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import Navbar from '../components/Navbar.svelte';
	import Alert from '../components/ui/Alert.svelte';
	import messageStore from '../storage/message.store';

	let { children } = $props();
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
