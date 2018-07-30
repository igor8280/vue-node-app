const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./config');
const baseWebpackConfig = require('./config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(baseWebpackConfig, {
	// split to multiple entry points (src and vendor)
	entry: {
		bundle: ['../src/index.js', hotMiddlewareScript]
	},
	mode: config.dev.env,
	// cheap-module-eval-source-map is faster for development
	// devtool: 'cheap-module-eval-source-map',
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		new FriendlyErrorsPlugin(),
		new VueLoaderPlugin()
	]
});
