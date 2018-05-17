// import './styles/test.css';
// import './styles/font.css';
// import './styles/test-s.scss';
// import './styles/test-l.less';
// import image from './assets/img/test.jpeg';
//
// console.log('RADI!!!');
//
// let img = document.createElement('img');
// // img.src = './assets/test.jpeg';
// img.src = image;
// document.body.appendChild(img);

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// import I18n from './services/i18n/i18n.strings';
// import validationMessagesEn from './services/i18n/validation/en';
//
// import store from './store';
// import debounce from './services/debounce';
//
// import Auth from './services/auth';
//
import routes from './routes';
// import globalVue from './global-vue';
// import ElementUI from 'element-ui';
// import locale from 'element-ui/lib/locale/lang/en';
// import VueAuthImage from 'vue-auth-image';
// import custom from '../static/js/custom';
// import '../static/styles/theme/vms/index.css';

// Setup Vue
Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(require('vue-i18n'));
// Vue.use(ElementUI, {
// 	locale
// });

// Vue.use(VueAuthImage);


// Set localization
Vue.config.lang = 'en';
// Object.keys(I18n).forEach(function(lang) {
// 	Vue.locale(lang, I18n[lang]);
// });

// Form Validation
// Vue.use(require('vee-validate'), {
// 	locale: 'en',
// 	dictionary: { // dictionary object
// 		en: { // locale key
// 			messages: validationMessagesEn
// 		}
// 	}
// });

Vue.config.debug = (process.env.NODE_ENV === 'development');
Vue.config.devtools = true;

Vue.http.options.emulateJSON = true;

/* Auth plugin */
// Vue.use(Auth);

// Global Mixin
// Vue.mixin(globalVue);
// Vue.mixin(debounce);
// Vue.mixin(custom);

// global components
// Vue.component('main-header', require('components/common/main-header'));
// Vue.component('edit-header', require('components/common/edit-header'));
// Vue.component('pagination', require('components/common/pagination'));
// Vue.component('table-density', require('components/common/table-density'));

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
// 	const auth = router.app.$options.store.state.auth;
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
// 	render: h => h(require('./app.vue'))
// }).$mount('#container');
//
new Vue({
	router,
	render: createElement => createElement(require('./app.vue').default)
}).$mount('#container');
