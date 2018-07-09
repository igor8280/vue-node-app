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
	state.session = {};
};
