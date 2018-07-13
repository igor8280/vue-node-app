export const updateAuth = (state, value) => {
	state.local.auth = value;
};

export const updateUser = (state, value) => {
	state.local.user = value;
};

export const showMenu = (state, value) => {
	state.showMenu = value;
};

export const setMenuVisibility = (state, value) => {
	state.showMenu = value;
};

export const toggleMenuCollapse = state => {
	state.local.collapsedMenu = !state.local.collapsedMenu;
};

export const saveLocal = (state, payload) => {
	state.local[payload.key] = payload.value;
};

export const saveSession = (state, payload) => {
	state.session[payload.key] = payload.value;
};

export const clearSession = state => {
	state.session = {history: []};
};

export const saveRoute = (state, route) => {
	let history = state.session.history;
	let lastRoute = history[history.length - 1];
	if (route !== lastRoute)
		history.push(route);
};

export const removeRoute = state => {
	state.session.history.pop();
};

export const setHistory = (state, value) => {
	state.session.history = value;
};
