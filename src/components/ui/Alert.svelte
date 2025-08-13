<script>
	import messageStore from '../../storage/message.store';

	export let type;
	export let message;

	function closeAlert() {
		messageStore.hide();
	}
</script>

<div class="row mt-3">
	<div class="col">
		<div
			class="alert alert-dismissible {type === 'error' ? 'alert-danger' : 'alert-success'}"
			role="alert"
		>
			<strong>{type === 'error' ? 'Error' : 'Success'}:</strong>
			{message}
			<button onclick={closeAlert} type="button" class="btn-close" aria-label="Close"></button>
		</div>
	</div>
</div>
