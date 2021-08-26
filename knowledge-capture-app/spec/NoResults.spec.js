import { cleanup, render } from '@testing-library/react';
import React from 'react';

import NoResults from '../src/javascript/modules/NoResults';

describe('Search Filters', () => {
	afterEach(cleanup);

	it('renders', () => {
		const { container } = render(<NoResults />);

		expect(container).toBeTruthy();
	});

	it('displays the no results message', () => {
		const { getByText } = render(<NoResults />);

		getByText('No search results available.');
	});
});
