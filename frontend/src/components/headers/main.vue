<template>
    <div class="header">
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


<style scoped lang="scss">
    @import '../../styles/element-variables.scss';

    .header {
        padding: 0 10px;
        line-height: 60px;
        background-color: $--color-primary;
        color: white;

        h1 {
            margin: 0px;
        }
    }
</style>