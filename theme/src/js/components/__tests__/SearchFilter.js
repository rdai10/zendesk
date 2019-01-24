import preact from 'preact';
import render from 'preact-render-to-string';

import SearchFilter from '../SearchFilter';

describe('SearchFilter', () => {
	const options = [
		{displayName: 'Option 1', value: 'one'},
		{displayName: 'Option 2', value: 'two'}
	];

	it('renders correctly', () => {
		const tree = render(
			<SearchFilter
				label="Search Filter"
				onClick={() => console.log('clicked')}
				options={options}
			/>
		);

		expect(tree).toMatchSnapshot();
	});
});
