/* eslint-env jest, browser */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { cleanup } from '@testing-library/react';

import App from '../src/javascript/modules/app';
import { CLIENT, SEARCH } from './mocks/mock';
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

	let errorSpy;
	let app;

	describe('Initialization Failure', () => {
		beforeEach((done) => {
			document.body.innerHTML = DOCUMENT_BODY;

			CLIENT.request = jest
				.fn()
				.mockReturnValueOnce(Promise.reject(new Error('a fake error')));

			app = new App(CLIENT, {});
			errorSpy = jest.spyOn(app, '_handleError');

			app.initializePromise.then(() => {
				done();
			});
		});

		it('should display an error message in the console', () => {
			expect(errorSpy).toBeCalled();
		});
	});

	describe('Initialization Success', () => {
		beforeEach((done) => {
			document.body.innerHTML = DOCUMENT_BODY;

			CLIENT.request = jest
				.fn()
				.mockReturnValueOnce(Promise.resolve(SEARCH));

			CLIENT.invoke = jest.fn().mockReturnValue(Promise.resolve({}));

			app = new App(CLIENT, {});
			app.initializePromise.then(() => {
				done();
			});
		});

		it('should retrieve the search data', () => {
			expect(app.states.searchResults[0].name).toEqual('Article Name 1');
		});
	});
});