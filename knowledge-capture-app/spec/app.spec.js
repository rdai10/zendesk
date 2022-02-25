/* eslint-env jest, browser */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { cleanup } from '@testing-library/react';

import App from '../src/javascript/modules/app';
import { APP_DATA, CLIENT } from './mocks/mock';
import createRangePolyfill from './polyfills/createRange';

const DOCUMENT_BODY =
	'<section class="main"><img class="loader" src="spinner.gif"/></section>';

jest.mock('../src/javascript/lib/i18n', () => {
	return {
		loadTranslations: jest.fn(),
		t: (key) => key,
	};
});

if (!document.createRange) {
	createRangePolyfill();
}

describe('Example App', () => {
	afterEach(cleanup);

	let app;

	describe('Initialization Success', () => {
		beforeEach((done) => {
			document.body.innerHTML = DOCUMENT_BODY;

			app = new App(CLIENT, APP_DATA);
			app.initializePromise.then(() => {
				done();
			});
		});

		it('should retrieve the search data', () => {
			expect(app.states.currentUser.name).toEqual('Sample User');
			expect(app.states.ticketId).toEqual(123456);
			expect(app.states.ticketSubject).toEqual('Sample Subject');
		});
	});
});
