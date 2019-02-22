import preact from 'preact';
import {
	cleanup,
	debounceRenderingOff,
	fireEvent,
	render
} from 'preact-testing-library';

import ProductTabs from '../ProductTabs';

const setup = () => {
	const productItems = [
		{
			configs: [
				{
					description: 'Card Description',
					name: 'Card with All Configs',
					svgId: '#ticket',
					url: '/'
				},
				{
					name: 'Card with No Description',
					svgId: '#ticket',
					url: '/'
				},
				{
					description: 'Card Description',
					name: 'Card with no Icon',
					url: '/'
				},
				{
					description: 'Card Description',
					name: 'Card with no URL',
					svgId: '#ticket'
				},
				{
					description: 'Card with No Name',
					svgId: '#ticket',
					url: '/'
				}
			],
			name: 'Tab All',
			tabAccess: 'all'
		},
		{
			configs: [
				{
					description: 'Card Description for KB Access',
					name: 'Card Name',
					svgId: '#ticket',
					url: '/'
				}
			],
			name: 'Tab KB',
			tabAccess: 'kb'
		},
		{
			configs: [
				{
					description: 'Card Description for Non KB Access',
					name: 'Card Name',
					svgId: '#ticket',
					url: '/'
				}
			],
			name: 'Tab Non KB',
			tabAccess: 'nonkb'
		}
	];

	const utils = render(
		<ProductTabs fullAccess productItems={productItems} />
	);

	return {
		productItems,
		...utils
	};
};

afterEach(cleanup);

describe('ProductTabs', () => {
	const {productItems} = setup();

	it('renders correctly with KB tabs and all access tabs', () => {
		const {container, getByText} = setup();

		const tabAll = getByText('Tab All');
		const tabKB = getByText('Tab KB');

		expect(tabAll).toBeDefined();
		expect(tabKB).toBeDefined();
		expect(container).toMatchSnapshot();
	});

	it('renders correctly with non KB tabs and all access tabs', () => {
		const {container, getByText} = render(<ProductTabs productItems={productItems} />);

		const tabAll = getByText('Tab All');
		const tabNonKB = getByText('Tab Non KB');

		expect(tabAll).toBeDefined();
		expect(tabNonKB).toBeDefined();
		expect(container).toMatchSnapshot();
	});

	it('renders Alert with text and link', () => {
		const {container, getByText} = render(
			<ProductTabs
				alert={{children: 'Alert', linkText: 'Link', url: '/'}}
				fullAccess
				productItems={productItems}
			/>
		);

		const alert = getByText('Alert');
		const linkText = getByText('Link');

		expect(alert).toBeDefined();
		expect(linkText).toBeDefined();
		expect(container).toMatchSnapshot();
	});

	it('renders new content when a tab is clicked', () => {
		debounceRenderingOff();

		const {getByText} = setup();

		fireEvent.click(getByText('Tab KB'));

		const KBCardDescription = getByText('Card Description for KB Access');

		expect(KBCardDescription).toBeDefined();
	});
});