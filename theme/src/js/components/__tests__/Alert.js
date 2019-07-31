import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import Alert from '../Alert';

afterEach(cleanup);

describe('Alert', () => {
	it('renders correctly', () => {
		const {container, getByText} = render(<Alert>Alert</Alert>);

		const alert = getByText('Alert');

		expect(alert).toBeDefined();
		expect(container).toMatchSnapshot();
	});

	it('renders with leading text', () => {
		const {container, getByText} = render(
			<Alert leadingText='Leading Text'>Alert</Alert>
		);

		const alert = getByText('Alert');
		const leadingText = getByText('Leading Text');

		expect(alert).toBeDefined();
		expect(leadingText).toBeDefined();
		expect(container).toMatchSnapshot();
	});
});
