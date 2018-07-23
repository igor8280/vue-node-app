import Vue from 'vue';
import ElementUi from 'element-ui';
import pagination from '@/components/pagination';
import searchBox from '@/components/search-box';
import utils from '@/utilities';
import api from '@/resources';

for (let path in api) {
	api[path].get = jest.fn();
	api[path].save = jest.fn();
	api[path].update = jest.fn();
	api[path].delete = jest.fn();
}

Vue.config.productionTip = false;

Vue.use(ElementUi);
Vue.component('pagination', pagination);
Vue.component('searchBox', searchBox);

Vue.prototype.$api = api;
Vue.prototype.$utils = function(name, ...args) {
	return utils[name].call(this, ...args);
};
