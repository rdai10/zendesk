const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com/api/v2'
		: 'https://liferaysupport1528999723.zendesk.com/api/v2';

/**
 * Returns a promise with the response body or throws an error if the status
 * code is not within the 200-299 range.
 * @param {Object} request The request object
 * @param {string} requestName The name of the request
 * @returns {Promise} A promise of the response body if the response status
 * code is between 200 and 299.
 */
function extractJSONBodyFromResponse(request, requestName) {
	return fetch(request).then(response => {
		if (!response.ok) {
			throw new Error(
				`Request for retrieving ${requestName} responded with ${response.statusText}`
			);
		}

		return response.json();
	});
}

/**
 * Returns a promise for Articles that matches the query string with an
 * option to search by label name
 * @param {string} queryString The query string
 * @param {number} count The number of articles per page
 * @param {number} page The number of page to query
 * @param {string} label The labels to search for
 * @param {string} locale The locale to search articles in
 * @returns {Promise} A promise of articles that matches the query string
 * and/or optionally, the label name; whose size is determined by the count per
 * page passed in
 */
export function getArticlesBySearch(
	queryString,
	count = '',
	page = 1,
	label = '',
	locale = 'en-us'
) {
	const request = new Request(
		`${BASE_URL}/help_center/articles/search.json?query=${queryString}&label_names=${label}&per_page=${count}&page=${page}&locale=${locale}`
	);

	return extractJSONBodyFromResponse(request, 'articles');
}

/**
 * Returns a promise for getting Articles under a Section
 * @param {string} id The section id
 * @param {string} locale The user's current locale
 * @param {number} count The number of Articles in the Section
 * @returns {Promise} A promise of Articles under a Section whose id is
 * passed into the function
 */
export function getArticlesBySectionId(id, locale, count) {
	const perPageCount = count ? `?per_page=${count}` : '';

	const request = new Request(
		`${BASE_URL}/help_center/${locale}/sections/${id}/articles.json${perPageCount}`
	);

	return extractJSONBodyFromResponse(request, `articles under section ${id}`);
}

/**
 * Returns a promise for a Ticket Request
 * @param {string} id The request id or ticket id
 * @returns {Promise} A promise of a Ticket(Request) by id
 */
export function getRequestById(id) {
	const request = new Request(`${BASE_URL}/requests/${id}`);

	return extractJSONBodyFromResponse(request, 'ticket');
}

/**
 * Returns a promise for getting the Section object
 * @param {string} id The section id
 * @param {string} locale The user's current locale
 * @param {string} resourceNames The comma separated name(s) of the resource to be side loaded within the Promise object
 * @returns {Promise} A promise of a section by its id
 */
export function getSectionBySectionId(id, locale, resourceNames = '') {
	const request = new Request(
		`${BASE_URL}/help_center/${locale}/sections/${id}.json?include=${resourceNames}`
	);

	return extractJSONBodyFromResponse(request, 'section');
}

/**
 * Returns a promise for getting Sections under a Category
 * @param {string} id The category id
 * @param {string} locale The user's current locale
 * @returns {Promise} A promise of Sections under a Category whose id is passed into the function
 */
export function getSectionsByCategoryId(id, locale) {
	const request = new Request(
		`${BASE_URL}/help_center/${locale}/categories/${id}/sections.json`
	);

	return extractJSONBodyFromResponse(
		request,
		`sections under cateogry ${id}`
	);
}

/**
 * Returns a promise of the given endpoint
 * @param {string} endpoint The request endpoint
 * @returns {Promise} A promise resulted from the endpoint
 */
export function makeGETRequest(endpoint) {
	const request = new Request(endpoint);

	return extractJSONBodyFromResponse(request, endpoint);
}
