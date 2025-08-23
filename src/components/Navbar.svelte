<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { signout } from '$lib/firebase/auth.client';
	import authStore from '../storage/auth.store';

	let isOpen = $state(false);

	function toggleNavbar() {
		isOpen = !isOpen;
	}

	async function handleLogout() {
		await signout();

		goto('/');
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
				{#if $authStore.isLoggedIn}
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={page.url.pathname === '/'}
							aria-current="page"
							href="/">Home</a
						>
					</li>
					<li class="nav-item">
						<a class:active={page.url.pathname === '/books/add'} class="nav-link" href="/books/add"
							>Add Book</a
						>
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
						<button onclick={handleLogout} class="nav-link">Logout</button>
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
