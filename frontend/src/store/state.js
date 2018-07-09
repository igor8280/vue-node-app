import merge from 'lodash/merge';

export const STORAGE_KEY = 'vms';

const STATE = {
	local: {
		collapsedMenu: false
	},
	session: {},
	showMenu: false
};

let localState = localStorage.getItem(STORAGE_KEY);
localState = localState ? JSON.parse(localState) : {};

let sessionState = sessionStorage.getItem(STORAGE_KEY);
sessionState = sessionState ? JSON.parse(sessionState) : {};

merge(STATE.local, localState);
merge(STATE.session, sessionState);

export default STATE;
