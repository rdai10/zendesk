const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: {
					discardComments: {removeAll: true}
				}
			}),
			new UglifyJsPlugin()
		]
	},
	plugins: [
		new ReplaceInFileWebpackPlugin([
			{
				dir: 'dist/templates',
				files: ['home_page.hbs'],
				rules: [
					{
						search: '360000869112',
						replace: '360000872551'
					},
					{
						search: '360015241432',
						replace: '360016525451'
					}
				]
			},
			{
				dir: 'dist/templates',
				files: ['new_request_page.hbs'],
				rules: [
					{
						search: '360006041192',
						replace: '360006076471'
					}
				]
			},
			{
				dir: 'dist/templates/category_pages',
				files: ['liferay_analytics_cloud.hbs'],
				rules: [
					{
						search: '360006610492',
						replace: '360006943791'
					},
					{
						search: '360015345972',
						replace: '360012956951'
					},
					{
						search: '360005556592',
						replace: '360012436852'
					},
					{
						search: '360004923432',
						replace: '360006608732'
					},
					{
						search: '360015347232',
						replace: '360016141611'
					}
				]
			}
		])
	]
});