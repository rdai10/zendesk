import preact from 'preact';
import render from 'preact-render-to-string';

import ProductTabs from '../ProductTabs';

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
		const tree = render(
			<ProductTabs fullAccess productItems={productItems} />
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders correctly non KB tabs and all access tabs', () => {
		const tree = render(<ProductTabs productItems={productItems} />);

		expect(tree).toMatchSnapshot();
	});
});