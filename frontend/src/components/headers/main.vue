<template>
    <div class="header__main">
        <div>
            <h1>{{header.title}}</h1>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'main-header',
		computed: {
			header() {
				return this.$store.getters.header;
			}
		},
		mounted() {
			this.$store.commit('setMenuVisibility', true);
		}
	};
</script>
