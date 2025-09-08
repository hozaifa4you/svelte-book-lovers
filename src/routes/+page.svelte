<script>
	import Book from '../components/Book/Book.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Home - Book Lovers</title>
</svelte:head>

<div class="row">
	{#each data.books as book (book.id)}
		<div class="col-md-4">
			<Book {book} />
		</div>
	{/each}
</div>
