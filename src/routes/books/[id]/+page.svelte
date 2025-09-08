<script>
	// @ts-nocheck
	import Like from '../../../components/Book/Like.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>{data.book.title} - Book Lovers</title>
</svelte:head>

<div class="row mt-3">
	<div class="col">
		<h1>Title: {data.book.title}</h1>
	</div>
</div>
<div class="row">
	<div class="col">
		<h2>Author: {data.book.author}</h2>
	</div>
</div>
<div class="row">
	<div class="col">
		<img class="main-image" src={data.book.main_picture} alt={data.book.title} />
	</div>
</div>
<div class="row mt-3">
	<div class="col">
		<pre>{data.book.description}</pre>
	</div>
</div>

<div class="d-flex align-items-center justify-content-center gap-3 flex-column">
	<a class="btn btn-primary" href={`/books/${data.book.id}/edit`}>Edit</a>
	<Like book={data.book} />
</div>

<style>
	.main-image {
		max-height: 300px;
	}
	.row {
		text-align: center;
	}
</style>
