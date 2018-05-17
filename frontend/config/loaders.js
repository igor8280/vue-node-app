const vueLoaderConfig = require('./vue-loader.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const loaders = {
	rules: [
		{
			enforce: 'pre',
			test: /\.(js|vue)$/,
			exclude: /node_modules/,
			loader: 'eslint-loader'
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		},
		{
			test: /\.js$/,
			loader: [
				'babel-loader',
			],
			exclude: /node_modules/
		},
		{
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				'css-hot-loader',
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'img/[name].[hash:7].[ext]'
					}
				}

			]
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'fonts/[name].[hash:7].[ext]'
					}
				}
			]
		},
		{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'less-loader'
			]
		}
	]
};

module.exports = loaders;
