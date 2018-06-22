export const showMenu = (state, value) => {
	state.showMenu = value;
};

export const setMenuVisibility = (state, value) => {
	state.showMenu = value;
};

export const toggleMenuCollapse = state => {
	state.collapsedMenu = !state.collapsedMenu;
};
