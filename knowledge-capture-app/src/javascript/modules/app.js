import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import I18n from '../lib/i18n';
import { API_ENDPOINTS } from '../lib/utility';

import Main from './Main';

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

		let search = { results: [] };

		try {
			search = await this._client.request(
				API_ENDPOINTS.search(ticketSubject)
			);
		} catch (e) {
			this._handleError.call(this, e);
		}

		this.states.searchResults = search.results;

		ReactDOM.render(
			<StrictMode>
				<Main data={this.states} />
			</StrictMode>,
			document.querySelector('.main')
		);
	}

	/**
	 * Handles error
	 * @param {Object} error error object
	 */
	_handleError(error) {
		console.error(
			'Promise rejected with the following status: ',
			error.status,
			error.statusText
		);
	}
}

export default App;
