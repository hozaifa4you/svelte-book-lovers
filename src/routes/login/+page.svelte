<script>
	import LoginWithGoogle from '../../components/Auth/LoginWithGoogle.svelte';
</script>

<svelte:head>
	<title>Login - Book Lovers</title>
</svelte:head>

<div class="row mt-5 justify-content-center">
	<div class="col-md-6">
		<h1>Login</h1>
		<hr />
		<LoginWithGoogle />
		<form>
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input
					type="email"
					name="email"
					class="form-control"
					id="email"
					placeholder="Email"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input
					type="password"
					name="password"
					class="form-control"
					id="password"
					placeholder="*********"
				/>
			</div>
			<button type="submit" class="btn btn-success w-100">Login</button>
		</form>
	</div>
</div>
