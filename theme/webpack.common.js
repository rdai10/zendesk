const clayCss = require('clay-css');

const glob = require('glob-all');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'source-map',
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
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(
				{
					cssProcessorOptions: {
						discardComments: {removeAll: true}
					}
				}
			),
			new UglifyJsPlugin(
				{
					sourceMap: true
				}
			)
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
					'action-item',
					'*alert*',
					'*article-content*',
					'button-unstyled',
					'expanded',
					'*gate-signin-prompt*',
					'*gated*',
					'*initiative*',
					'*loading-animation*',
					'nav-card',
					'nav-stacked',
					'nesty-input',
					'notification-dismiss',
					'notification-notice',
					'*panel*',
					'products-landing',
					'products-landing-tab-content',
					'products-landing-tabs',
					'*request-container*',
					'*request_description_hint*',
					'*search-result-description*',
					'*search-results-list*',
					'sidenav-fallback',
					'sidenav-tree',
					'status-label-answered',
					'*submenu*',
					'*suggestion-list*',
					'#systemStatusBanner',
					'*toc-body*',
					'upload-dropzone'
				]
			}
		})
	]
};