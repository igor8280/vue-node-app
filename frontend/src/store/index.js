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
	// data intended to store in local storage
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state.local));

	// data intended to store in session storage
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.session));
});

export default store;
