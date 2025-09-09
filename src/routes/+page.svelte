<script>
	import { goto } from '$app/navigation';
	import Book from '../components/Book/Book.svelte';

	const { data } = $props();

	async function back() {
		await goto(`/?page=${+data.page - 1}`);
	}

	function next() {
		goto(`/?page=${+data.page + 1}`);
	}
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

<div class="mt-5 mx-auto">
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<li class="page-item" class:disabled={!data.hasPrev}>
				<button onclick={back} class="page-link">Previous</button>
			</li>
			<li class="page-item" class:disabled={!data.hasNext}>
				<button onclick={next} class="page-link">Next</button>
			</li>
		</ul>
	</nav>
</div>
