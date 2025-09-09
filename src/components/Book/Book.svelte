<script>
	import Like from './Like.svelte';

	export let book;
</script>

<div class="row mt-3">
	<div class="col">
		<h4>{book.title}</h4>
	</div>
</div>
<div class="row">
	<div class="col">
		<h6>Author: {book.author}</h6>
	</div>
</div>
<div class="row">
	<div class="col">
		<img class="main-image" src={book.main_picture} alt={book.title} />
	</div>
</div>
<div class="row mt-3">
	<div class="col">
		<pre>{book.description}</pre>
	</div>
</div>

<div class="d-flex align-items-center justify-content-center gap-3 flex-column">
	<a class="btn btn-info" href={`/books/${book.id}`}>View</a>
	<a class="btn btn-primary" href={`/books/${book.id}/edit`}>Edit</a>
	<Like {book} on:toggle_like />
</div>

<style>
	.main-image {
		max-height: 300px;
	}
	.row {
		text-align: center;
	}
</style>
