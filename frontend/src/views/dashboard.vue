<template>
    <section id="welcome">

        <!--Page Body-->
        <section>
            <div>
                <h1>Welcome to Test</h1>
                <el-button @click="toggleMenu()">toggle</el-button>
                <el-button @click="changeToken">change token</el-button>
                <el-button @click="userMe">user me</el-button>
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
			},
			changeToken() {
				let auth = Object.assign({}, this.$store.getters.local.auth);
				auth.accessToken = 'test';
				this.$store.commit('updateAuth', auth);
			},
			userMe() {
				this.$resource('/proxy/users/me').get().then(response => response.json()).then(data => {
					console.log(data);
				});
			}
		}
	};
</script>
