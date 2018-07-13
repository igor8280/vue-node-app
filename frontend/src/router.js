import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';

// Setup router
const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'active',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition)
			return savedPosition;
		else {
			return {
				x: 0,
				y: 0
			};
		}
	},
	routes
});

router.beforeEach((to, from, next) => {
	let history = store.getters.session.history;
	if (history.length) {
		let lastPathInHistory = history[history.length - 1];

		// if user click on browser back button instead of header back button
		// remove last route from history
		if (lastPathInHistory === to.path)
			store.commit('removeRoute');

		// if user change route manually to go few steps back
		// remove all history after that route
		else if (history.includes(to.path)) {
			let index = history.indexOf(to.path);
			store.commit('setHistory', history.slice(0, index));
		}
		// user leave
		else if (from.path !== lastPathInHistory && from.path !== '/')
			store.commit('setHistory', []);
	}

	const auth = store.state.local.auth;
	if (to.meta.requiresAuth !== false) {
		if (!auth.isLoggedIn)
			next('/signin');
		else
			next();
	}
	else
		next();
});

export default router;
