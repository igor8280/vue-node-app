const env = process.env.NODE_ENV || 'development';

let mongoUrl = null;
if (env === 'test')
	mongoUrl = 'mongodb://localhost:27017/proto-meta-test';
else
	mongoUrl = 'mongodb://localhost:27017/proto-meta';

const config = {
	env,
	'port': 3006,
	mongoUrl,
	'bodyLimit': '100kb',
	'salt': {
		'access_token': 'sa-dFf?GfGdsa=4cJKvdFsa',
		'refresh_token': 'daS32=dGfa=-dsDf?dfa3'
	},
	pathPublicImages: {
		'dotfiles': 'ignore',
		'etag': false,
		'extensions': ['png', 'jpg', 'jpeg'],
		'index': false,
		'maxAge': '1y',
		'redirect': false,
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now())
		}
	}
};

export default config;
