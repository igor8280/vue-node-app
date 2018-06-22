import Vue from 'vue';
import Vuex from 'vuex';

import state, { STORAGE_KEY } from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

// modules
import header from './modules/header';

Vue.use(Vuex);

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		header
	}
});

store.subscribe((mutation, state) => {
	// choose which properties are stored in localStorage
	let storage = {
		collapsedMenu: state.collapsedMenu
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
});

export default store;
