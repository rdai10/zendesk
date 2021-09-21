import axios from 'axios';

const baseURL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com/api/v2/'
		: 'https://liferaysupport1528999723.zendesk.com/api/v2/';

const httpRequest = axios.create({
	baseURL: baseURL
});

/**
 * Returns a promise of Articles that matches the query string with an option to search by label name
 * @param {string} queryString The query string
 * @param {number} count The number of articles per page
 * @param {number} page The number of page to query
 * @param {string} label The labels to search for
 * @param {string} locale The locale to search articles in
 * @returns {Promise} Promise object of articles that matches the query string and/or optionally, the label name; whose size is determined by the count per page passed in
 */
export function getArticlesBySearch(
	queryString,
	count = '',
	page = 1,
	label = '',
	locale = 'en-us'
) {
	return httpRequest.get(
		`help_center/articles/search.json?query=${queryString}&label_names=${label}&per_page=${count}&page=${page}&locale=${locale}`
	);
}

/**
 * Returns a promise of Articles under a Section
 * @param {string} id The section id
 * @param {string} locale The user's current locale
 * @param {number} count The number of Articles in the Section
 * @returns {Promise} Promise object of Articles under a Section whose id is passed into the function
 */
export function getArticlesBySectionId(id, locale, count) {
	const perPageCount = count ? `?per_page=${count}` : '';

	return httpRequest.get(
		`help_center/${locale}/sections/${id}/articles.json${perPageCount}`
	);
}

/**
 * Returns a promise of the Request object
 * @param {string} id The request id or ticket id
 * @returns {Promise} Promise object of a Request or Ticket by its id
 */
export function getRequestById(id) {
	return httpRequest.get(`requests/${id}`);
}

/**
 * Returns a promise of the Section object
 * @param {string} id The section id
 * @param {string} locale The user's current locale
 * @param {string} resourceNames The comma separated name(s) of the resource to be side loaded within the Promise object
 * @returns {Promise} Promise object of a section by its id
 */
export function getSectionBySectionId(id, locale, resourceNames = '') {
	return httpRequest.get(
		`help_center/${locale}/sections/${id}.json?include=${resourceNames}`
	);
}

/**
 * Returns a promise of Sections under a Category
 * @param {string} id The category id
 * @param {string} locale The user's current locale
 * @returns {Promise} Promise object of Sections under a Category whose id is passed into the function
 */
export function getSectionsByCategoryId(id, locale) {
	return httpRequest.get(
		`help_center/${locale}/categories/${id}/sections.json`
	);
}

/**
 * Returns a promise of the Request result
 * @param {string} endpoint The request endpoint
 * @returns {Promise} Promise object resulted from the Request
 */
export function makeGETRequest(endpoint) {
	return axios.get(endpoint);
}
