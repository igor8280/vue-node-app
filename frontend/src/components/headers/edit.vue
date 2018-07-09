<template>
	<div class="header__edit">
		<div>
			<h1>{{header.title}}</h1>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'edit-header',
		computed: {
			header() {
				return this.$store.getters.header;
			}
		},
		mounted() {
			this.$store.commit('setMenuVisibility', false);
		}
	};
</script>
