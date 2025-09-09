<script>
	import Book from '../../components/Book/Book.svelte';

	const { data } = $props();
</script>

{#each data.books as book (book.id)}
	<Book {book} />
{/each}
