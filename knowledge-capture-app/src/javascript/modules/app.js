import I18n from '../lib/i18n';
import { render } from '../lib/helpers';
import getDefaultTemplate from '../../templates/default';

const API_BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com/api/v2/help_center'
		: 'https://liferaysupport1528999723.zendesk.com/api/v2/help_center';
const RESULTS_COUNT = 25;

const API_ENDPOINTS = {
	search: (queryString, locale = 'en-US') =>
		`${API_BASE_URL}/articles/search.json?query=${queryString}&per_page=${RESULTS_COUNT}&page=1&locale=${locale}`,
};

class App {
	constructor(client, appData) {
		this._client = client;
		this._appData = appData;

		this.states = {};

		// this.initializePromise is only used in testing
		// indicates app initilization(including all async operations) is complete
		this.initializePromise = this.init();
	}

	/**
	 * Initialize module, render main template
	 */
	async init() {
		const currentUser = (await this._client.get('currentUser')).currentUser;
		const ticketSubject = await this._client.get('ticket.subject');

		this.states.locale = currentUser.locale;
		this.states.ticketSubject = ticketSubject;

		I18n.loadTranslations(currentUser.locale);

		let search = { results: '' };

		try {
			search = await this._client.request(
				API_ENDPOINTS.search(ticketSubject)
			);
		} catch (e) {
			this._handleError.call(this, e);
		}

		this.states.searchResults = search.results;

		render('.loader', getDefaultTemplate(this.states));
	}

	/**
	 * Handles error
	 * @param {Object} error error object
	 */
	_handleError(error) {
		console.error('An error is handled here: ', error.message);
	}
}

export default App;
