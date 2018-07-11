<template>
    <div :class="{'menu__open': !isCollapse, 'menu__close': isCollapse}">
		<div class="icon-collapse" @click="toggleCollapse">
			<i class="el-icon-d-arrow-left" />
		</div>

        <el-menu :default-active="$route.path"
                 :collapse="isCollapse"
                 @select="selectMenu"
                 :collapse-transition="false"
				 :class="{'el-menu--open': !isCollapse, 'el-menu--close': isCollapse}">

			<!-- first level -->
			<template v-for="(nav, i) in navigation">
				<!-- first level navigation without sub items-->
				<el-menu-item class="first-level" v-if="!nav.subItems" :index="nav.path || ''" :key="i">
					<i v-if="nav.icon" :class="nav.icon"></i>
					<span slot="title">{{nav.label}}</span>
				</el-menu-item>

				<!-- first level navigation with sub items-->
				<el-submenu class="first-level" v-else :index="'item-' + i">
					<template slot="title">
						<i v-if="nav.icon" :class="nav.icon"></i>
						<span slot="title">{{nav.label}}</span>
					</template>

					<!-- second level -->
					<template v-for="(sub, i2) in nav.subItems">
						<!-- second level navigation without sub items-->
						<el-menu-item v-if="!sub.subItems" :index="sub.path || ''" :key="'sub-' + i2">
							<i v-if="sub.icon" :class="sub.icon"></i>
							<span slot="title">{{sub.label}}</span>
						</el-menu-item>

						<!-- second level navigation with sub items-->
						<el-submenu v-else :index="'sub-item-' + i2">
							<template slot="title">
								<i v-if="sub.icon" :class="sub.icon"></i>
								<span slot="title">{{sub.label}}</span>
							</template>

							<!-- third level -->
							<template v-for="(subSub, i3) in sub.subItems">
								<!-- third level navigation without sub items-->
								<el-menu-item v-if="!subSub.subItems" :index="subSub.path || ''" :key="'subSub-' + i3">
									<i v-if="subSub.icon" :class="subSub.icon"></i>
									<span slot="title">{{subSub.label}}</span>
								</el-menu-item>
							</template>

						</el-submenu>

					</template>

				</el-submenu>

			</template>

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
						label: 'test',
						icon: 'el-icon-search',
						subItems: [
							{
								label: 'test 1.1',
								path: '/test/1'
							},
							{
								label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
								path: '/test-lorem'
							},
							{
								label: 'test 1.2',
								path: '/test/2',
								subItems: [
									{
										label: 'test 1.2.1',
										path: '/test/1.2.1'
									},
									{
										label: 'test 1.2.2',
										path: '/test/1.2.2'
									},
									{
										label: 'test 1.2.3',
										path: '/test/1.2.3'
									},
									{
										label: 'Praesent lacinia erat vel ligula elementum condimentum',
										path: '/test/1.2.4'
									}
								]
							},
							{
								label: 'test 1.3',
								path: '/test/3'
							}
						]
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
