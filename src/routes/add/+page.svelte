<script>
	import { enhance } from '$app/forms';

	const { data, form } = $props();
</script>

<svelte:head>
	<title>Add new book - Book Lovers</title>
</svelte:head>

<div class="container">
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h1>Add new book</h1>
			<hr />
			{#if form && form.success}
				<div class="alert alert-success" role="alert">Book added successfully!</div>
			{:else}
				<form use:enhance enctype="multipart/form-data" method="POST">
					<div class="mb-3">
						<label for="title" class="form-label">Book Title</label>
						<input
							type="text"
							name="title"
							class="form-control is-invalid"
							id="title"
							placeholder="Book Title"
						/>
						<div class="invalid-feedback">Title Error</div>
					</div>
					<div class="mb-3">
						<label for="author" class="form-label">Author</label>
						<input
							type="text"
							name="author"
							class="form-control"
							id="author"
							placeholder="Author"
						/>
					</div>
					<div class="mb-3">
						<label for="short_description" class="form-label">Short Description</label>
						<input
							type="text"
							name="short_description"
							class="form-control"
							id="short_description"
							placeholder="Enter short description"
						/>
					</div>
					<div class="mb-3">
						<label class="form-label" for="description">Description</label>
						<textarea
							class="form-control"
							placeholder="Book Description here"
							id="description"
							name="description"
							style="height: 100px"
						></textarea>
					</div>
					<div class="mb-3">
						<label for="main_picture" class="form-label">Main Book Picture</label>
						<input
							class="form-control form-control-lg"
							id="main_picture"
							accept="image/*"
							name="main_picture"
							type="file"
						/>
					</div>
					<div class="mb-3">
						<label for="small_picture" class="form-label">Small Book Picture</label>
						<input
							class="form-control form-control-lg"
							id="small_picture"
							accept="image/*"
							name="small_picture"
							type="file"
						/>
					</div>
					<button type="submit" class="btn btn-primary w-100"> Submit </button>
				</form>
			{/if}
		</div>
	</div>
</div>
