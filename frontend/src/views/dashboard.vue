<template>
    <section id="welcome">

        <!--Page Body-->
        <section>
            <div>
                <h1>Welcome to Test</h1>
                <el-button @click="toggleMenu()">toggle</el-button>
            </div>
        </section>
        <!--End Page Body-->

    </section>
</template>

<script>
	export default {
		name: 'Dashboard',

		mounted() {
			this.$store.dispatch('setHeader', {
				type: 'main',
				title: 'Dashboard'
			});
		},

		methods: {
			toggleMenu() {
				this.$store.commit('setMenuVisibility', !this.$store.getters.showMenu);
			}
		}
	};
</script>
