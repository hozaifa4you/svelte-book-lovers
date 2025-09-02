<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await fetch('/api/like/eoe2UK11xVShaoFlKB1I', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' }
		});

		const result = await response.json();
		console.log(result);
	});
</script>
