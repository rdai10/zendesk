const clayCss = require('clay-css');

const glob = require('glob-all');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')()]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [clayCss.includePaths]
						}
					}
				]
			}
		]
	},
	output: {
		filename: 'script.js',
		library: 'Liferay',
		libraryTarget: 'window'
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'src/resources/.zat',
				to: ''
			},
			{
				from: 'src/resources/assets',
				to: 'assets'
			},
			{
				from: 'src/resources/settings',
				to: 'settings'
			},
			{
				from: 'src/resources/templates',
				to: 'templates'
			},
			{
				from: 'src/resources/translations',
				to: 'translations'
			},
			{
				from: 'src/resources/manifest.json',
				to: ''
			},
			{
				from: 'src/resources/thumbnail.png',
				to: ''
			}
		]),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		new PurifyCSSPlugin({
			paths: glob.sync([
				path.join(__dirname, 'src/resources/templates/*.hbs'),
				path.join(__dirname, 'src/*.js')
			]),
			purifyOptions: {
				whitelist: [
					'*code*',
					'*loading-animation*',
					'nav-card',
					'nesty-input',
					'notification-dismiss',
					'notification-notice',
					'*pre*',
					'*request_description_hint*',
					'status-label-answered',
					'*submenu*',
					'*suggestion-list*',
					'upload-dropzone'
				]
			}
		})
	]
};