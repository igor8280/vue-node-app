const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const config = require('./config');
const loaders = require('./loaders');

const resolve = (dir) => {
	return path.join(__dirname, '..', dir);
};

module.exports = {
	context: resolve('src'),
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.json', '.vue'],
		modules: [
			resolve('node_modules')
		],
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'src': resolve('src')
		}
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: loaders
};
