const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(
	common,
	{
		mode: 'production',
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
		plugins: [
			new ReplaceInFileWebpackPlugin(
				[
					{
						dir: 'dist/templates',
						files: ['document_head.hbs'],
						rules: [
							{
								replace: 'var cfaRules = [{"fieldType":"tagger","field":360006076471,"value":"liferay_dxp_cloud","select":[360011715231,360011607612,360009953451],"formId":360000179191,"requireds":[]}];',
								search: 'var cfaRules = [{"fieldType":"tagger","field":360006041192,"value":"liferay_commerce","select":[360009627572],"formId":360000077272,"requireds":[360009627572]},{"fieldType":"tagger","field":360006041192,"value":"liferay_dxp","select":[360006075611,360009385592],"formId":360000077272,"requireds":[360009385592,360006075611]},{"fieldType":"tagger","field":360006041192,"value":"liferay_dxp_cloud","select":[360010378011],"formId":360000077272,"requireds":[360010378011]},{"fieldType":"tagger","field":360006041192,"value":"liferay_portal","select":[360009601071,360009385592],"formId":360000077272,"requireds":[360009601071,360009385592]}];'
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
								replace: '360016525451',
								search: '360015241432'
							}
						]
					},
					{
						dir: 'dist/templates',
						files: ['new_request_page.hbs'],
						rules: [
							{
								replace: '360011506832',
								search: '360011314571'
							},
							{
								replace: '360006076471',
								search: '360006041192'
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
				]
			)
		]
	}
);