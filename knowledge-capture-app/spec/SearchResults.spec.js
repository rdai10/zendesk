import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';

import { CLIENT, SEARCH } from './mocks/mock';
import { GlobalContext } from '../src/javascript/context/Global';
import SearchResults from '../src/javascript/modules/SearchResults';

function renderSearchResults() {
	return render(
		<GlobalContext.Provider value={{ client: CLIENT }}>
			<SearchResults
				categories={SEARCH.categories}
				results={SEARCH.results}
				sections={SEARCH.sections}
			/>
		</GlobalContext.Provider>
	);
}

describe('Search Results', () => {
	beforeEach(() => {
		CLIENT.invoke = jest.fn();
	});

	afterEach(cleanup);

	it('renders', () => {
		const { container } = renderSearchResults();

		expect(container).toBeTruthy();
	});

	it('renders the article title from the search results', () => {
		const { getByText } = renderSearchResults();

		getByText('Article Name 1');
	});

	it('renders the breadcrumb correctly', () => {
		const { getByText } = renderSearchResults();

		getByText('Category Name 1');
		getByText('Section Name 1');
	});

	it('renders the last edited date for the search results', () => {
		const { getByText } = renderSearchResults();

		getByText('Last edited December 5, 2020');
	});

	it('renders the Link article button', () => {
		const { getByText } = renderSearchResults();

		getByText('Link article');
	});

	it('renders the Linked tag when the Link article button is clicked', () => {
		const { getByText } = renderSearchResults();

		fireEvent.click(getByText('Link article'));

		getByText('Linked');
	});
});
