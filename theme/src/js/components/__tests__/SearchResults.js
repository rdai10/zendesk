import preact from 'preact';
import render from 'preact-render-to-string';

import SearchResults from '../SearchResults';

describe('SearchResults', () => {
	const filterOptions = [
		{displayName: 'Option 1', value: 'one'},
		{displayName: 'Option 2', value: 'two'}
	];

	it('renders correctly', () => {
		const tree = render(
			<SearchResults
				filterLabel="filter"
				filterOptions={filterOptions}
				locale="en-us"
				queryString="Test"
			/>
		);

		expect(tree).toMatchSnapshot();
	});
});