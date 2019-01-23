import preact from 'preact';
import render from 'preact-render-to-string';

import Pagination from '../Pagination';

describe('Pagination', () => {
	it('renders correctly', () => {
		const handleOnclick = () => console.log('clicked');

		const tree = render(
			<Pagination onClick={handleOnclick} perPage={10} total={100} />
		);

		expect(tree).toMatchSnapshot();
	});
});