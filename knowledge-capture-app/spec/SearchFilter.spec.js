import { cleanup, render } from '@testing-library/react';
import React from 'react';

import SearchFilters from '../src/javascript/modules/SearchFilters';
import { SEARCH } from './mocks/mock';

function renderSearchFilters() {
	return render(<SearchFilters resultsDisplayed={SEARCH.results.length} />);
}

describe('Search Filters', () => {
	afterEach(cleanup);

	it('renders', () => {
		const { container } = renderSearchFilters();

		expect(container).toBeTruthy();
	});

	it('displays the number of results correctly', () => {
		const { getByText } = renderSearchFilters();

		getByText('1 results');
	});

	it('displays the language toggle correctly', () => {
		const { getByText } = renderSearchFilters();

		getByText('Language Selector');
		getByText('English');
	});
});
