import {API_BASE_URL, DEFAULT_LOCALE, RESULTS_COUNT} from './constants';

export const API_ENDPOINTS = {
	search: (queryString, locale = DEFAULT_LOCALE) =>
		`${API_BASE_URL}/articles/search.json?query=${queryString}&per_page=${RESULTS_COUNT}&page=1&locale=${locale}&include=sections,categories,users`
};

/**
 * Displays a date object in the MDY format.
 * @param {Object|string} date Date to be formatted.
 * @returns {string} String representation of the date in MDY format
 */
export function displayDateInMDYFormat(date) {
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(date));
}

/**
 * Inserts a link into the Zendesk Ticket Editor wysiwyg
 * @param {Object} client the Zendesk App Client object for a specific
 * app instance.
 * @param {string} name The link text to be displayed in the Ticket Editor.
 * @param {string} url The href for the link.
 */
export function insertResult(client, name, url) {
	client.invoke(
		'ticket.editor.insert',
		`<a href=${url}?source=search rel="noopener noreferrer" target="_blank" >${name}</a>`
	);
}
