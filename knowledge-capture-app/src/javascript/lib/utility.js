import { API_BASE_URL, DEFAULT_LOCALE, RESULTS_COUNT } from './constants';

export const API_ENDPOINTS = {
	search: (queryString, locale = DEFAULT_LOCALE) =>
		`${API_BASE_URL}/articles/search.json?query=${queryString}&per_page=${RESULTS_COUNT}&page=1&locale=${locale}&include=sections,categories,users`,
};

export function displayDateInMDYFormat(date) {
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));
}

export function insertResult(client, name, url) {
	client.invoke(
		'ticket.editor.insert',
		`<a href=${url}?source=search rel="noopener noreferrer" target="_blank" >${name}</a>`
	);
}
