import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import api from './resources';
import utils from './utilities';

import store from './store';
import routes from './routes';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
// import './styles/element-variables.scss';
import 'cropperjs/dist/cropper.min.css';

// Setup Vue
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI, {
	locale
});

Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

// global components
Vue.component('pagination', require('./components/pagination').default);
Vue.component('search-box', require('./components/search-box').default);

// Set localization
Vue.config.lang = 'en';

Vue.config.debug = (process.env.NODE_ENV === 'development');
Vue.config.devtools = true;

Vue.http.options.emulateJSON = true;

// Setup router
const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'active',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition)
			return savedPosition;
		else {
			return {
				x: 0,
				y: 0
			};
		}
	},
	routes: routes
});

// router.beforeEach((to, from, next) => {
// 	window.historyFrom = from;
// 	const auth = router.index.$options.store.state.auth;
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// 		if (!auth.isLoggedIn)
// 			next('/signin');
// 		else
// 			next();
// 	}
// 	else
// 		next();
// });

// export default router;
export const eventBus = new Vue();

/* eslint-disable no-new */
// new Vue({
// router,
// store,
// 	render: h => h(require('./index.vue'))
// }).$mount('#container');
//
new Vue({
	router,
	store,
	render: createElement => createElement(require('./app.vue').default)
}).$mount('#container');
