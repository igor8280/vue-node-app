<style>
	.Alert {
		padding: 2em;
	}

	.Alert-Success {
		border: 10px solid green;
	}

	.Alert-Error {
		border: 10px solid red;
	}
</style>

<template>
	<div>
		<div class="Alert"><h1>{{ message }}</h1></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: 'hello!'
			}
		}
	}
</script>
