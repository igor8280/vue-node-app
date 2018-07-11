<template>
    <div class="header__main">
        <div class="title">
            <h1>{{header.title}}</h1>
        </div>
		<div>
			<el-button @click="logout">Logout</el-button>
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
		methods: {
			logout() {
				this.$store.commit('updateAuth', {});
				this.$router.push('/signin');
				this.$message({
					showClose: true,
					type: 'info',
					message: `Logout success.`,
					duration: 2000
				});
			}
		}
	};
</script>
