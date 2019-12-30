const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [new UglifyJsPlugin()]
	},
	plugins: [
		new ReplaceInFileWebpackPlugin([
			{
				dir: 'dist/templates',
				files: ['header.hbs'],
				rules: [
					{
						replace: '360001749912',
						search: '360001749972'
					},
					{
						replace: '360000872531',
						search: '360000874031'
					},
					{
						replace: '360000868032',
						search: '360000869252'
					},
					{
						replace: '360000867932',
						search: '360000874051'
					},
					{
						replace: '360000867952',
						search: '360000869132'
					},
					{
						replace: '360000872551',
						search: '360000869112'
					},
					{
						replace: '360000867972',
						search: '360000869172'
					},
					{
						replace: '360000872571',
						search: '360000869192'
					},
					{
						replace: '360017784212',
						search: '360019000351'
					},
					{
						replace: '360000868172',
						search: '360000893891'
					},
					{
						replace: '360000779952',
						search: '360000580671'
					},
					{
						replace: '360000892272',
						search: '360000892252'
					},
					{
						replace: '360016700231',
						search: /360018999331/g
					},
					{
						replace: '360018875952',
						search: '360018999691'
					},
					{
						replace: '360002103292',
						search: '360002100591'
					},
					{
						replace: '360002241991',
						search: '360002103332'
					},
					{
						replace: '360016515831',
						search: '360018693032'
					},
					{
						replace: '360000892912',
						search: '360018692772'
					},
					{
						replace: '360015994791',
						search: '360018999191'
					},
					{
						replace: '360016510271',
						search: '360018999271'
					}
				]
			},
			{
				dir: 'dist/templates',
				files: ['home_page.hbs'],
				rules: [
					{
						replace: '360000872551',
						search: '360000869112'
					},
					{
						replace: '360000868032',
						search: '360000869252'
					},
					{
						replace: '360000867952',
						search: '360000869132'
					},
					{
						replace: '360000872531',
						search: '360000874031'
					},
					{
						replace: '360000867932',
						search: '360000874051'
					},
					{
						replace: '360000867972',
						search: '360000869172'
					},
					{
						replace: '360000872571',
						search: '360000869192'
					},
					{
						replace: '360000892272',
						search: '360000892252'
					},
					{
						replace: '360001749912',
						search: '360001749972'
					},
					{
						replace: '360002099931',
						search: '360002102352'
					},
					{
						replace: '360002099851',
						search: '360002099871'
					},
					{
						replace: '360002102392',
						search: '360002099951'
					},
					{
						replace: '360002102452',
						search: '360002102472'
					},
					{
						replace: '360001862992',
						search: '360001865811'
					}
				]
			},
			{
				dir: 'dist/templates',
				files: ['new_request_page.hbs'],
				rules: [
					{
						replace: '360011506832',
						search: /360011314571/g
					},
					{
						replace: '360006076471',
						search: /360006041192/g
					}
				]
			},
			{
				dir: 'dist/templates/category_pages',
				files: ['liferay_analytics_cloud.hbs'],
				rules: [
					{
						replace: '360006943791',
						search: '360006610492'
					},
					{
						replace: '360012956951',
						search: '360015345972'
					},
					{
						replace: '360012436852',
						search: '360005556592'
					},
					{
						replace: '360006608732',
						search: '360004923432'
					},
					{
						replace: '360016141611',
						search: '360015347232'
					}
				]
			}
		])
	]
});
