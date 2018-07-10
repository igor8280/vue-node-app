export default [
	{
		path: '/',
		component: require('./views/dashboard').default
		// meta: {
		// 	requiresAuth: true
		// }
	},
	{
		path: '/countries',
		component: require('./views/countries/list').default
	},
	{
		path: '/countries/:id',
		component: require('./views/countries/edit').default
	},
	{
		path: '/languages',
		component: require('./views/languages/list').default
	},
	{
		path: '/languages/:id',
		component: require('./views/languages/edit').default
	},
	{
		path: '/image-cropper',
		component: require('./views/image-cropper/cropper').default
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
