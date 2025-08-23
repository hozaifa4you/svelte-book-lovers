<script>
	import { enhance } from '$app/forms';

	const { data, form, ...rest } = $props();

	console.log({ data, form, rest });
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
							class="form-control"
							class:is-invalid={form?.errors?.some((err) => err.path === 'title')}
							value={form?.data?.title}
							id="title"
							placeholder="Book Title"
						/>
						{#if form?.errors?.some((err) => err.path === 'title')}
							<div class="invalid-feedback">
								{form?.errors.find((err) => err.path === 'title')?.message}
							</div>
						{/if}
					</div>
					<div class="mb-3">
						<label for="author" class="form-label">Author</label>
						<input
							type="text"
							name="author"
							class="form-control"
							id="author"
							placeholder="Author"
							class:is-invalid={form?.errors?.some((err) => err.path === 'author')}
							value={form?.data?.author}
						/>
						{#if form?.errors?.some((err) => err.path === 'author')}
							<div class="invalid-feedback">
								{form?.errors.find((err) => err.path === 'author')?.message}
							</div>
						{/if}
					</div>

					<div class="mb-3">
						<label for="short_description" class="form-label">Short Description</label>
						<input
							type="text"
							name="short_description"
							class="form-control"
							id="short_description"
							placeholder="Enter short description"
							class:is-invalid={form?.errors?.some((err) => err.path === 'short_description')}
							value={form?.data?.short_description}
						/>
						{#if form?.errors?.some((err) => err.path === 'short_description')}
							<div class="invalid-feedback">
								{form?.errors.find((err) => err.path === 'short_description')?.message}
							</div>
						{/if}
					</div>
					<div class="mb-3">
						<label class="form-label" for="description">Description</label>
						<textarea
							class="form-control"
							placeholder="Book Description here"
							id="description"
							name="description"
							style="height: 100px"
							class:is-invalid={form?.errors?.some((err) => err.path === 'description')}
						></textarea>
						{#if form?.errors?.some((err) => err.path === 'description')}
							<div class="invalid-feedback">
								{form?.errors.find((err) => err.path === 'description')?.message}
							</div>
						{/if}
					</div>
					<div class="mb-3">
						<label for="main_picture" class="form-label">Main Book Picture</label>
						<input
							class="form-control form-control-lg"
							id="main_picture"
							accept="image/*"
							name="main_picture"
							type="file"
							class:is-invalid={form?.errors?.some((err) => err.path === 'main_picture')}
						/>
						{#if form?.errors?.some((err) => err.path === 'main_picture')}
							<div class="invalid-feedback">
								{form?.errors.find((err) => err.path === 'main_picture')?.message}
							</div>
						{/if}
					</div>
					<div class="mb-3">
						<label for="small_picture" class="form-label">Small Book Picture</label>
						<input
							class="form-control form-control-lg"
							id="small_picture"
							accept="image/*"
							name="small_picture"
							type="file"
							class:is-invalid={form?.errors?.some((err) => err.path === 'small_picture')}
						/>
						{#if form?.errors?.some((err) => err.path === 'small_picture')}
							<div class="invalid-feedback">
								{form?.errors.find((err) => err.path === 'small_picture')?.message}
							</div>
						{/if}
					</div>
					<button type="submit" class="btn btn-primary w-100"> Submit </button>
				</form>
			{/if}
		</div>
	</div>
</div>
