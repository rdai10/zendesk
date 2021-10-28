import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import SearchResults from '../SearchResults';

jest.mock('../../helpers/api-helpers');

afterEach(cleanup);

describe('SearchResults', () => {
	const filterOptions = [
		{displayName: 'Option 1', value: 'one'},
		{displayName: 'Option 2', value: 'two'}
	];

	it('renders correctly', () => {
		const {container} = render(
			<SearchResults
				filterLabel='filter'
				filterOptions={filterOptions}
				locale='en-us'
				queryString='Test'
			/>
		);

		expect(container).toBeTruthy();
	});
});
