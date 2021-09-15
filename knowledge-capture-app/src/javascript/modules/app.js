import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { GlobalContext } from '../context/Global';
import { DEFAULT_LOCALE, MODAL, TICKET_SIDEBAR } from '../lib/constants';
import I18n from '../lib/i18n';
import ErrorBoundary from './ErrorBoundary';
import Main from './Main';
import Modal from './Modal';
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
	init() {
		const { location } = this._appData.context;

		if (location) {
			location === MODAL ? this._initModal() : this._initTicketSidebar();
		} else {
			this._initTicketSidebar();
		}
	}

	async _initModal() {
		const appInstances = await this._getAppInstances();
		const ticketSidebar = this._client.instance(
			appInstances[TICKET_SIDEBAR]
		);

		this.states.ticketSidebar = ticketSidebar;

		ticketSidebar.trigger('modalReady');

		this._client.on('transferModalData', (data) => this._renderModal(data));
	}

	async _initTicketSidebar() {
		let currentUser = null;
		let ticketSubject = '';

		try {
			const [user, subject] = await Promise.all([
				this._client.get('currentUser'),
				this._client.get('ticket.subject'),
			]);

			currentUser = user.currentUser;
			ticketSubject = subject['ticket.subject'];
		} catch (e) {
			this._handleError.call(this, e);
		}

		const locale = currentUser ? currentUser.locale : DEFAULT_LOCALE;

		this.states.currentUser = currentUser;
		this.states.locale = locale;
		this.states.ticketSubject = ticketSubject;

		this.states.ticketId = this._appData.context.ticketId;

		I18n.loadTranslations(locale);

		this._renderTicketSideBar();
	}

	async _getAppInstances() {
		const instanceData = await this._client.get('instances');

		return Object.fromEntries(
			Object.entries(instanceData.instances).map(
				([uuid, { location }]) => [location, uuid]
			)
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

	_renderModal(data) {
		ReactDOM.render(
			<StrictMode>
				<ErrorBoundary>
					<GlobalContext.Provider
						value={{
							client: this._client,
							ticketSidebar: this.states.ticketSidebar,
						}}
					>
						<ThemeProvider theme={Theme}>
							<Modal data={data} />
						</ThemeProvider>
					</GlobalContext.Provider>
				</ErrorBoundary>
			</StrictMode>,
			document.querySelector('.main')
		);
	}

	_renderTicketSideBar() {
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
}

export default App;
