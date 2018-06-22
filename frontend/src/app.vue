<template>
    <div id="app">
        <el-container>
            <el-aside width="auto">
                <navigation v-show="$store.getters.showMenu"></navigation>
            </el-aside>
            <el-container>
                <el-header style="padding: 0px;">
                    <header-main v-show="header.type === 'main'"/>
                </el-header>
                <el-main style="padding: 0px;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
	export default {
		name: 'App',
		computed: {
			header() {
				return this.$store.getters.header;
			}
		},
		components: {
			navigation: require('./components/navigation').default,
			headerMain: require('./components/headers/main').default
		}
	};

</script>

<style>
    body {
        margin: 0px;
    }
</style>