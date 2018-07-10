import axios from 'axios';

const httpRequest = axios.create({
	baseURL: 'https://liferaysupport1528999723.zendesk.com/api/v2/help_center/'
});

export function getArticlesBySectionId(locale, id) {
	return httpRequest.get(locale + '/sections/' + id + '/articles.json');
}

export function getSectionsCategories(locale) {
	return httpRequest(
		{
			params: {
				include: 'categories'
			},
			url: locale + '/sections.json'
		}
	);
}