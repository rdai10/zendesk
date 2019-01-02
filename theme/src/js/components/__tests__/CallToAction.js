import preact from 'preact';
import render from 'preact-render-to-string';

import CallToAction from '../CallToAction';

describe('CallToAction', () => {
	const basicActionItems = [
		{
			link: '/',
			name: 'Action Item 1'
		},
		{
			link: '/',
			name: 'Action Item 2'
		}
	];

	it('renders correctly', () => {
		const tree = render(<CallToAction actionItems={basicActionItems} />);

		expect(tree).toMatchSnapshot();
	});

	it('renders with class name', () => {
		const tree = render(
			<CallToAction
				actionItems={basicActionItems}
				className="class-name"
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with section heading', () => {
		const tree = render(
			<CallToAction
				actionItems={basicActionItems}
				sectionHeading="Section Heading"
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with section heading', () => {
		const tree = render(
			<CallToAction
				actionItems={basicActionItems}
				sectionHeading="Section Heading"
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with disclaimer text', () => {
		const tree = render(
			<CallToAction
				actionItems={[
					{
						disclaimer: 'This is a disclaimer.',
						link: '/',
						name: 'Action Item'
					}
				]}
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with an icon', () => {
		const tree = render(
			<CallToAction
				actionItems={[
					{
						iconId: '#ticket',
						link: '/',
						name: 'Action Item'
					}
				]}
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with a message', () => {
		const tree = render(
			<CallToAction
				actionItems={[
					{
						link: '/',
						message: 'Message',
						name: 'Action Item'
					}
				]}
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with promotions', () => {
		const tree = render(
			<CallToAction
				actionItems={basicActionItems}
				promotions={[
					{
						name: 'Promotion Name',
						url: '/'
					}
				]}
			/>
		);

		expect(tree).toMatchSnapshot();
	});

	it('renders with promotions containing description', () => {
		const tree = render(
			<CallToAction
				actionItems={basicActionItems}
				promotions={[
					{
						description: 'Promotion Description',
						name: 'Promotion Name',
						url: '/'
					}
				]}
			/>
		);

		expect(tree).toMatchSnapshot();
	});
});