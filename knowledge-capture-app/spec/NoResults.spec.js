import { cleanup, render } from '@testing-library/react';
import React from 'react';

import NoResults from '../src/javascript/modules/NoResults';

const clickHandler = jest.fn();

describe('Search Filters', () => {
	afterEach(cleanup);

	it('renders', () => {
		const { container } = render(<NoResults clickHandler={clickHandler} />);

		expect(container).toBeTruthy();
	});

	it('displays the no results message', () => {
		const { getByText } = render(<NoResults clickHandler={clickHandler} />);

		getByText('No search results available.');
	});

	it('displays link to create new knowledge base article', () => {
		const { getByText } = render(<NoResults clickHandler={clickHandler} />);

		getByText('Create new knowledge.');
	});
});
