import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://help.liferay.com/api/v2/' : 'https://liferaysupport1528999723.zendesk.com/api/v2/';

const httpRequest = axios.create(
	{
		baseURL: baseURL
	}
);

export function getArticlesByPerPageCount(id, locale, count) {
	return httpRequest.get(
		'help_center/' + locale + '/sections/' + id + '/articles.json?per_page=' + count
	);
}

export function getArticlesBySectionId(id, locale) {
	return httpRequest.get(
		'help_center/' + locale + '/sections/' + id + '/articles.json'
	);
}

export function getRequestById(id) {
	return httpRequest.get('requests/' + id);
}

export function getSectionBySectionId(id, locale) {
	return httpRequest.get(
		'help_center/' + locale + '/sections/' + id + '.json'
	);
}

export function getSectionsByCategoryId(id, locale) {
	return httpRequest.get(
		'help_center/' + locale + '/categories/' + id + '/sections.json'
	);
}