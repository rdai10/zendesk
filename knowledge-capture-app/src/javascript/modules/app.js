import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@zendeskgarden/react-theming';
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
		let brandId = '';
		let currentUser = null;
		let ticketId = '';
		let ticketSubject = '';

		try {
			const [user, brand, ticket, subject] = await Promise.all([
				this._client.get('currentUser'),
				this._client.get('ticket.brand.id'),
				this._client.get('ticket.id'),
				this._client.get('ticket.subject'),
			]);

			brandId = brand['ticket.brand.id'];
			currentUser = user.currentUser;
			ticketId = ticket['ticket.id'];
			ticketSubject = subject['ticket.subject'];
		} catch (e) {
			this._handleError.call(this, e);
		}

		this.states.brandId = brandId;
		this.states.currentUser = currentUser;
		this.states.ticketId = ticketId;
		this.states.ticketSubject = ticketSubject;

		const locale = currentUser ? currentUser.locale : DEFAULT_LOCALE;

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
	_handleError(error) {
		console.error(
			`Retriving data returned with the following error: `,
			error.status,
			error.statusText
		);
	}
}

export default App;
