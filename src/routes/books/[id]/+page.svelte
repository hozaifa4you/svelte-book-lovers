<script>
	// @ts-nocheck
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

<style>
	.main-image {
		max-height: 300px;
	}
	.row {
		text-align: center;
	}
</style>
