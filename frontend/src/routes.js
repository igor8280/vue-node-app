export default [
	// {
	// 	path: '/',
	// 	component: require('./views/dashboard'),
	// 	meta: {
	// 		requiresAuth: true
	// 	}
	// },
	{
		path: '/403',
		component: require('./views/errors/403')
	},
	{
		path: '/404',
		component: require('./views/errors/404')
	},
	{
		path: '/500',
		component: require('./views/errors/500')
	},
	{
		path: '*',
		component: require('./views/errors/404')
	}

];
