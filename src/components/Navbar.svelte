<script>
	import { page } from '$app/state';

	let isLoggedIn = $state(false);
	let isOpen = $state(false);

	function toggleNavbar() {
		isOpen = !isOpen;
	}
</script>

<svelte:head>
	<title>Book Lover</title>
</svelte:head>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Book Lover</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
			onclick={toggleNavbar}
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class:show={isOpen} class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				{#if isLoggedIn}
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={page.url.pathname === '/'}
							aria-current="page"
							href="/">Home</a
						>
					</li>
					<li class="nav-item">
						<a class:active={page.url.pathname === '/add'} class="nav-link" href="/add">Add Book</a>
					</li>
					<li class="nav-item">
						<a class:active={page.url.pathname === '/profile'} class="nav-link" href="/profile"
							>Profile</a
						>
					</li>
					<li class="nav-item">
						<a class:active={page.url.pathname === '/about'} class="nav-link" href="/about">About</a
						>
					</li>
					<li class="nav-item">
						<span class="nav-link">Logout</span>
					</li>
				{:else}
					<!-- Not Logged In -->
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={page.url.pathname === '/'}
							aria-current="page"
							href="/">Home</a
						>
					</li>
					<li class="nav-item">
						<a class="nav-link" class:active={page.url.pathname === '/about'} href="/about">About</a
						>
					</li>

					<li class="nav-item">
						<a class="nav-link" class:active={page.url.pathname === '/login'} href="/login">Login</a
						>
					</li>
					<li class="nav-item">
						<a class="nav-link" class:active={page.url.pathname === '/signup'} href="/signup"
							>Sign Up</a
						>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<style>
	.nav-item > span {
		cursor: pointer;
	}
</style>
