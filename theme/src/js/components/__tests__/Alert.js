import preact from 'preact';
import render from 'preact-render-to-string';

import Alert from '../Alert';

describe('Alert', () => {
	it('renders correctly', () => {
		const tree = render(<Alert>Alert</Alert>);

		expect(tree).toMatchSnapshot();
	});

	it('renders with leading text', () => {
		const tree = render(<Alert leadingText="Leading Text">Alert</Alert>);

		expect(tree).toMatchSnapshot();
	});
});