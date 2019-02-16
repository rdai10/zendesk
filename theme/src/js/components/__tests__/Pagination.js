import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import Pagination from '../Pagination';

afterEach(cleanup);

describe('Pagination', () => {
	it('renders correctly', () => {
		const handleClick = jest.fn();

		const {container} = render(
			<Pagination onClick={handleClick} perPage={10} total={100} />
		);

		expect(container).toMatchSnapshot();
	});
});