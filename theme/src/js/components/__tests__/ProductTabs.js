import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import ProductTabs from '../ProductTabs';

afterEach(cleanup);

describe('ProductTabs', () => {
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
					description: 'Card Description',
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
					description: 'Card Description',
					name: 'Card Name',
					svgId: '#ticket',
					url: '/'
				}
			],
			name: 'Tab Non KB',
			tabAccess: 'nonkb'
		}
	];

	it('renders correctly with KB tabs and all access tabs', () => {
		const {container} = render(
			<ProductTabs fullAccess productItems={productItems} />
		);

		expect(container).toMatchSnapshot();
	});

	it('renders correctly non KB tabs and all access tabs', () => {
		const {container} = render(<ProductTabs productItems={productItems} />);

		expect(container).toMatchSnapshot();
	});

	it('renders with simple text Alert', () => {
		const {container} = render(
			<ProductTabs
				alert={{children: 'Alert'}}
				fullAccess
				productItems={productItems}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with simple text Alert with leading text', () => {
		const {container} = render(
			<ProductTabs
				alert={{children: 'Alert', leadingText: 'Lead'}}
				fullAccess
				productItems={productItems}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with text and link in Alert', () => {
		const {container} = render(
			<ProductTabs
				alert={{children: 'Alert', linkText: 'Link', url: '/'}}
				fullAccess
				productItems={productItems}
			/>
		);

		expect(container).toMatchSnapshot();
	});
});