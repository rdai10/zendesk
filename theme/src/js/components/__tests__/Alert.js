import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import Alert from '../Alert';

afterEach(cleanup);

describe('Alert', () => {
	it('renders correctly', () => {
		const {container} = render(<Alert>Alert</Alert>);

		expect(container).toMatchSnapshot();
	});

	it('renders with leading text', () => {
		const {container} = render(<Alert leadingText="Leading Text">Alert</Alert>);

		expect(container).toMatchSnapshot();
	});
});