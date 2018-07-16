<template>
    <div id="app">
        <el-container>
            <el-aside class="menu" width="auto">
                <navigation v-show="$store.getters.showMenu"></navigation>
            </el-aside>
            <el-container>
                <el-header class="header" v-show="header.type">
                    <header-main v-show="header.type === 'main'"/>
                    <header-edit v-show="header.type === 'edit'"/>
                </el-header>
                <el-main>
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
			headerMain: require('./components/headers/main').default,
			headerEdit: require('./components/headers/edit').default
		}
	};

</script>
