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
		<form class="mt-4">
			<div class="mb-3">
				<label for="exampleInputEmail1" class="form-label">Email address</label>
				<input
					type="email"
					class="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
				/>
				<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1" />
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</div>
