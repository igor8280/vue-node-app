const state = {
	type: '',
	title: ''
};

const getters = {
	header: state => state
};

const mutations = {
	setType: (state, value) => {
		state.type = value;
	},
	setTitle: (state, value) => {
		state.title = value;
	}
};

const actions = {
	setHeader: (context, value) => {
		console.log(context);
		context.commit('setTitle', value.title);
		context.commit('setType', value.type);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
