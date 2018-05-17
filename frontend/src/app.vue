<template>
    <div id="app">
        <div id="page-wrap">
            <transition  name="fade" mode="out-in" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                <!--v-loading.fullscreen.lock="loading" element-loading-text="Loading..."-->
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'App',
		// mixins: [custom],
		data() {
			return {
				loading: false
			};
		},
		methods: {
			beforeEnter(el) {
				this.loading = true;
			},
			afterEnter(el) {
				this.loading = false;
			},
			enter(el) {
				// this.loading = true;
			}
		},
		created() {
			this.loading = false;
			// this.$store.state.previousRoutePath = null; // patch for clearing path from localStorage
		}

	};

</script>

<style src="./styles/test-s.scss" lang="scss" />
<style src="./styles/test-l.less" lang="less" />
<style src="./styles/font.css" lang="css" />
<style src="./styles/test.css" lang="css" />

<style>
    #app {
        text-align: center;
    }
</style>
