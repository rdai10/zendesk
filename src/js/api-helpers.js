import axios from 'axios';

axios.defaults.baseURL = 'https://liferaysupport1528999723.zendesk.com/api/v2/help_center/';

export function getArticlesBySectionId(id) {
	return axios.get(axios.defaults.baseURL + 'sections/' + id + '/articles.json');
}

export function getSectionsCategories() {
	return axios(
		{
			params: {
				include: 'categories'
			},
			url: axios.defaults.baseURL + 'sections.json'
		}
	);
}