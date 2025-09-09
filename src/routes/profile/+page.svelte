<script>
	import Book from '../../components/Book/Book.svelte';

	const { data } = $props();
</script>

<div class="row">
	{#each data.books as book (book.id)}
		<div class="col-md-3 mb-4">
			<Book {book} />
		</div>
	{/each}
</div>
