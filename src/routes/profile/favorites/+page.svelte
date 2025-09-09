<script>
	import Book from '../../../components/Book/Book.svelte';

	const { data } = $props();

	/**
	 * Filter out unliked books from the list
	 * @param {*} event
	 */
	function filterUnlikeBook(event) {
		const { id } = event.detail;

		data.books = data.books.filter((b) => b.id !== id);
	}
</script>

<div class="row">
	{#each data.books as book (book.id)}
		<div class="col-md-3 mb-4">
			<Book {book} on:toggle_like={filterUnlikeBook} />
		</div>
	{/each}
</div>
