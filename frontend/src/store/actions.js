export const showMenu = ({commit}, value) => {
	commit('showMenu', value);
};

export const goBack = context => {
	return new Promise((resolve) => {
		let history = context.state.session.history;
		let lastRoute = history[history.length - 1] || '/';
		context.commit('removeRoute');
		resolve(lastRoute);
	});
};
