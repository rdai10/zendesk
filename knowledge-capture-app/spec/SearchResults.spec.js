import { cleanup, render } from '@testing-library/react';
import React from 'react';

import { SEARCH } from './mocks/mock';
import SearchResults from '../src/javascript/modules/SearchResults';

function renderSearchResults() {
	return render(<SearchResults results={SEARCH.results} />);
}

describe('Search Results', () => {
	afterEach(cleanup);

	it('renders', () => {
		const { container } = renderSearchResults();

		expect(container).toBeTruthy();
	});

	it('renders the article title from the search results', () => {
		const { getByText } = renderSearchResults();

		getByText('Article Name 1');
	});

	it('renders the last edited date for the search results', () => {
		const { getByText } = renderSearchResults();

		getByText('Last edited December 5, 2020');
	});
});
