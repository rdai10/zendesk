import { ThemeProvider } from '@zendeskgarden/react-theming';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { GlobalContext } from '../context/Global';
import { DEFAULT_LOCALE } from '../lib/constants';
import I18n from '../lib/i18n';
import ErrorBoundary from './ErrorBoundary';
import Main from './Main';
import { Theme } from './Theme';

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
		let currentUser = null;

		try {
			currentUser = (await this._client.get('currentUser')).currentUser;
		} catch (e) {
			this._handleError.call(this, e, 'current user');
		}

		let ticketSubject = '';

		try {
			ticketSubject = await this._client.get('ticket.subject');
			ticketSubject = ticketSubject['ticket.subject'];
		} catch (e) {
			this._handleError.call(this, e, 'ticket subject');
		}

		this.states.currentUser = currentUser;
		this.states.ticketSubject = ticketSubject;

		const locale = currentUser.locale ? currentUser.locale : DEFAULT_LOCALE;

		I18n.loadTranslations(locale);

		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContext.Provider value={{ client: this._client }}>
						<ThemeProvider theme={Theme}>
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
	_handleError(error, name) {
		console.error(
			`Retriving ${name} returned with the following error: `,
			error.status,
			error.statusText
		);
	}
}

export default App;
