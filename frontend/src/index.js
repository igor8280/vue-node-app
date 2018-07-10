import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import api from './resources';
import utils from './utilities';

import store from './store';
import router from './router';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

import './styles/main.scss';

// Setup Vue
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI, {
	locale
});

Vue.prototype.$api = api;
Vue.prototype.$utils = function(name, ...args) {
	return utils[name].call(this, ...args);
};

// global components
Vue.component('pagination', require('./components/pagination').default);
Vue.component('search-box', require('./components/search-box').default);

// Set localization
Vue.config.lang = 'en';

Vue.config.debug = (process.env.NODE_ENV === 'development');
Vue.config.devtools = true;

Vue.http.options.emulateJSON = true;

export const eventBus = new Vue();

new Vue({
	router,
	store,
	render: createElement => createElement(require('./app.vue').default)
}).$mount('#container');
