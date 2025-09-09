<script>
	import { page } from '$app/state';
</script>

<h1>Profile</h1>
<svelte:head>
	<title>Book Lovers - Profile</title>
</svelte:head>
<div class="row">
	<div class="col">
		<ul class="nav nav-tabs w-100">
			<li class="nav-item">
				<a
					class:active={page.url.pathname === '/profile'}
					class="nav-link"
					aria-current="page"
					href="/profile">My Books</a
				>
			</li>
			<li class="nav-item">
				<a
					class:active={page.url.pathname === '/profile/favorites'}
					class="nav-link"
					href="/profile/favorites">Favorites</a
				>
			</li>
		</ul>
	</div>
</div>

<slot />
