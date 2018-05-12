const clayCss = require('clay-css');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/index.js',
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
							plugins: () => [
								require('autoprefixer')()
							]
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
		]},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(
				{
					cssProcessorOptions: {
						discardComments: {removeAll: true}
					}
				}
			),
			new UglifyJsPlugin()
		]
	},
	output: {
		filename: 'script.js'
	},
	plugins: [
		new CopyWebpackPlugin([
			{from:'src/resources/assets', to:'assets'},
			{from:'src/resources/settings', to:'settings'},
			{from:'src/resources/templates', to:'templates'},
			{from:'src/resources/translations', to:'translations'},
			{from:'src/resources/manifest.json', to:''},
			{from:'src/resources/thumbnail.png', to:''}
		]),
		new ImageminPlugin({
			test: '/\.(jpe?g|png|gif|svg)$/i',
			svgo: {
				plugins: [
					{cleanupAttrs: true},
					{cleanupNumericValues: true},
					{cleanupListOfValues: true},
					{collapseGroups: true},
					{mergePaths: true},
					{removeDoctype: true},
					{removeEditorsNSData: true},
					{removeEmptyAttrs: true},
					{removeEmptyContainers: true},
					{removeEmptyText: true},
					{removeUnusedNS: true},
					{removeUselessStrokeAndFill: true},
					{removeXMLProcInst: true}
				]
			}
		}),
		new MiniCssExtractPlugin(
			{filename: 'style.css'}
		)
	]
};
