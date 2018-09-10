import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://help.liferay.com/api/v2/help_center/' : 'https://liferaysupport1528999723.zendesk.com/api/v2/help_center/';

const httpRequest = axios.create(
	{
		baseURL: baseURL
	}
);

export function getArticlesBySectionId(id, locale) {
	return httpRequest.get(locale + '/sections/' + id + '/articles.json');
}

export function getSectionBySectionId(id, locale) {
	return httpRequest.get(locale + '/sections/' + id + '.json');
}

export function getSectionsByCategoryId(id, locale) {
	return httpRequest.get(locale + '/categories/' + id + '/sections.json');
}