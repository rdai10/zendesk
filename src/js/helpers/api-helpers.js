import axios from 'axios';

const httpRequest = axios.create({
	baseURL: 'https://liferaysupport1528999723.zendesk.com/api/v2/help_center/'
});

export function getArticlesBySectionId(id) {
	return httpRequest.get('sections/' + id + '/articles.json');
}

export function getSectionsCategories() {
	return httpRequest(
		{
			params: {
				include: 'categories'
			},
			url: 'sections.json'
		}
	);
}