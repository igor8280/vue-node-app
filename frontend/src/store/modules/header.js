const defaultState = {
	type: '',
	title: '',
	goBack: null,
	save: null
};
const state = {
	...defaultState
};

const getters = {
	header: state => state
};

const mutations = {
	setHeader: (state, value) => {
		for (let key in defaultState) {
			if (value.hasOwnProperty(key))
				state[key] = value[key];
			else
				state[key] = defaultState[key];
		}
	}
};

// array of headers where menu should be visible
let showMenuIn = ['main'];

const actions = {
	setHeader: (context, value) => {
		context.commit('setHeader', value);
		context.commit('setMenuVisibility', showMenuIn.includes(value.type));
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
