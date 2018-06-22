<template>
    <div :class="{'menu-open': !isCollapse, 'menu-close': isCollapse}">

        <el-button @click="toggleCollapse" :icon="'el-icon-d-arrow-' + (isCollapse ? 'right' : 'left')"></el-button>

        <el-menu :default-active="$route.path"
                 :collapse="isCollapse"
                 @select="selectMenu"
                 :collapse-transition="false">

            <el-menu-item v-for="(nav, i) in navigation" :index="nav.path || ''" :key="i">
                <i v-if="nav.icon" :class="nav.icon"></i>
                <span slot="title">{{nav.label}}</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>
	export default {
		name: 'navigation',
		computed: {
			isCollapse() {
				return this.$store.getters.collapsedMenu;
			}
		},
		data() {
			return {
				navigation: [
					{
						label: 'Dashboard',
						icon: 'el-icon-menu',
						path: '/'
					},
					{
						label: 'Countries',
						icon: 'el-icon-location',
						path: '/countries'
					},
					{
						label: 'Languages',
						icon: 'el-icon-document',
						path: '/languages'
					},
					{
						label: 'Cropper',
                        icon: 'el-icon-picture',
						path: '/image-cropper'
					}
				]
			};
		},
		methods: {
			toggleCollapse() {
				this.$store.commit('toggleMenuCollapse');
			},
			selectMenu(index) {
				this.$router.push(index);
			}
		}
	};
</script>

<style scoped>
    .menu-open {
        width: 300px;
        transition: width 0.2s ease;
    }

    .menu-close {
        width: 65px;
        transition: width 0.2s ease;
    }
</style>