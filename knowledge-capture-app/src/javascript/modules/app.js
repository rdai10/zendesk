import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { GlobalContext } from '../context/Global';
import I18n from '../lib/i18n';
import { API_ENDPOINTS } from '../lib/utility';
import ErrorBoundary from './ErrorBoundary';
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

		let ticketSubject = await this._client.get('ticket.subject');
		ticketSubject = ticketSubject['ticket.subject'] || '';

		this.states.locale = currentUser.locale;
		this.states.ticketSubject = ticketSubject;

		I18n.loadTranslations(currentUser.locale);

		let search = null;

		try {
			search = await this._client.request(
				API_ENDPOINTS.search(ticketSubject)
			);
		} catch (e) {
			this._handleError.call(this, e);
		}

		this.states.searchData = search;

		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContext.Provider value={{ client: this._client }}>
						<ThemeProvider>
							<Main data={this.states} />
						</ThemeProvider>
					</GlobalContext.Provider>
				</ErrorBoundary>
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
			'Query for Search Results returned with the following error: ',
			error.status,
			error.statusText
		);
	}
}

export default App;
