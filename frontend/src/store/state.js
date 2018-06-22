import merge from 'lodash/merge';

export const STORAGE_KEY = 'vms';

const STATE = {
	showMenu: false,
	collapsedMenu: false
};

let storage = localStorage.getItem(STORAGE_KEY);
let oldState = storage ? JSON.parse(storage) : {};

// delete keys that are not part of this state
for (let key in oldState) {
	if (!STATE.hasOwnProperty(key))
		delete oldState[key];
}

export default merge({}, STATE, oldState);
