<template>
    <div :class="{'menu__open': !isCollapse, 'menu__close': isCollapse}">
		<div class="icon-collapse" @click="toggleCollapse">
			<i class="el-icon-d-arrow-left" />
		</div>

        <el-menu :default-active="$route.path"
                 :collapse="isCollapse"
                 @select="selectMenu"
                 :collapse-transition="false"
				 background-color="#333333"
				 text-color="#ffffff">

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
				// clear session storage
				this.$store.commit('clearSession');

				this.$router.push(index);
			}
		}
	};
</script>
