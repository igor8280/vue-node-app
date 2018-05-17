export default [
	{
		path: '/',
		component: require('./views/dashboard').default
		// meta: {
		// 	requiresAuth: true
		// }
	},
	{
		path: '/403',
		component: require('./views/errors/403').default
	},
	{
		path: '/404',
		component: require('./views/errors/404').default
	},
	{
		path: '/500',
		component: require('./views/errors/500').default
	},
	{
		path: '*',
		component: require('./views/errors/404').default
	}

];
