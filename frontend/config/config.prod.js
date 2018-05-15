const path = require('path');
// const utils = require('./utils');
const config = require('./config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const env = process.env.NODE_ENV === 'testing'
// 	? require('../config/test.env')
// 	: config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
	entry: {
		bundle: '../src/index.js'
	},
	mode: config.build.env,
	// module: {
	// 	rules: utils.styleLoaders({
	// 		sourceMap: config.build.productionSourceMap,
	// 		extract: true
	// 	})
	// },
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		path: config.build.assetsRoot,
		// filename: utils.assetsPath('js/[name].[chunkhash].js'),
		filename: 'js/[name].[chunkhash].js',
		// chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
		chunkFilename: 'js/[id].[chunkhash].js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "css/[name].[chunkhash].css",
			chunkFilename: "css/[id].[chunkhash].css"
		}),
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		// new webpack.DefinePlugin({
		// 	'process.env': env
		// }),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		// extract css into its own file
		// new ExtractTextPlugin({
		// 	filename: utils.assetsPath('css/[name].[contenthash].css')
		// }),
		// generate dist index.html with correct asset hash for caching.
		// you can customize output by editing /index.html
		// see https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: process.env.NODE_ENV === 'testing'
				? 'index.html'
				: config.build.index,
			template: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		})
		// split vendor js into its own file
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks: function (module, count) {
		// 		// any required modules inside node_modules are extracted to vendor
		// 		return (
		// 			module.resource &&
		// 			/\.js$/.test(module.resource) &&
		// 			module.resource.indexOf(
		// 				path.join(__dirname, '../node_modules')
		// 			) === 0
		// 		)
		// 	}
		// }),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'manifest',
		// 	chunks: ['vendor']
		// })
		// new webpack.ProvidePlugin({
		// 	$: "jquery",
		// 	jQuery: "jquery",
		// 	"window.jQuery": "jquery"
		// })
	]
});

if (config.build.productionGzip) {
	const CompressionWebpackPlugin = require('compression-webpack-plugin');

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtensions.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}

if (config.build.bundleAnalyzerReport) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
