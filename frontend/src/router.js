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
