const clayCss = require('clay-css');
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
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
			new UglifyJsPlugin({
				sourceMap: true
			})
		]
	},
	output: {
		filename: 'script.js'
	},
	plugins: [
		new MiniCssExtractPlugin(
			{filename: 'style.css'}
		)
	]
};
