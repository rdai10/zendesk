import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import DocSideNav from '../DocSideNav';

afterEach(cleanup);

describe('DocSideNav', () => {
	it('renders correctly', () => {
		const {container} = render(
			<DocSideNav currentArticleId="123" locale="en-us" sectionId="789" />
		);

		expect(container).toMatchSnapshot();
	});
});