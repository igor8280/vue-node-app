import VueRouter from 'vue-router';
import routes from './routes';

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

// router.beforeEach((to, from, next) => {
// 	window.historyFrom = from;
// 	const auth = router.index.$options.store.state.auth;
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// 		if (!auth.isLoggedIn)
// 			next('/signin');
// 		else
// 			next();
// 	}
// 	else
// 		next();
// });

export default router;
