import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ?
	'https://help.liferay.com/api/v2/help_center/' :
	'https://liferaysupport1528999723.zendesk.com/api/v2/help_center/';

const httpRequest = axios.create({
	baseURL: baseURL
});

export function getArticlesBySectionId(locale, id) {
	return httpRequest.get(locale + '/sections/' + id + '/articles.json');
}

export function getSectionsCategories(locale) {
	return httpRequest({
		params: {
			include: 'categories'
		},
		url: locale + '/sections.json'
	});
}