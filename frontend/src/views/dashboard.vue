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
		name: 'Welcome',

		mounted() {
			this.$store.dispatch('setHeader', {
				type: 'main',
				title: 'Dashboard'
			});
			console.log('dashboard');
		},

		methods: {
			toggleMenu() {
				this.$store.commit('setMenuVisibility', !this.$store.getters.showMenu);
			}
		}
	};
</script>
