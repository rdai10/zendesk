import preact from 'preact';
import render from 'preact-render-to-string';

import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator', () => {
	it('renders correctly', () => {
		const tree = render(<LoadingIndicator />);

		expect(tree).toMatchSnapshot();
	});
});