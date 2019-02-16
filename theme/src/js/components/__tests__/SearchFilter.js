import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import SearchFilter from '../SearchFilter';

afterEach(cleanup);

describe('SearchFilter', () => {
	const options = [
		{
			displayName: 'Option 1',
			value: 'one'
		},
		{
			displayName: 'Option 2',
			value: 'two'
		}
	];

	it('renders correctly', () => {
		const {container} = render(
			<SearchFilter
				label="Search Filter"
				onClick={jest.fn()}
				options={options}
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
