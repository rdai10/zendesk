import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import LoadingIndicator from '../LoadingIndicator';

afterEach(cleanup);

describe('LoadingIndicator', () => {
	it('renders correctly', () => {
		const {container} = render(<LoadingIndicator />);

		expect(container).toMatchSnapshot();
	});
});
