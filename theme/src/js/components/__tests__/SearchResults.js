import preact from 'preact';
import render from 'preact-render-to-string';

import SearchResults from '../SearchResults';

describe('SearchResults', () => {
	it('renders correctly', () => {
		const tree = render(
			<SearchResults queryString="Test" />
		);

		expect(tree).toMatchSnapshot();
	});
});