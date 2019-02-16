import preact from 'preact';
import {render} from 'preact-testing-library';

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
		const {container} = render(<CallToAction actionItems={basicActionItems} />);

		expect(container).toMatchSnapshot();
	});

	it('renders with class name', () => {
		const {container} = render(
			<CallToAction
				actionItems={basicActionItems}
				className="class-name"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with section heading', () => {
		const {container} = render(
			<CallToAction
				actionItems={basicActionItems}
				sectionHeading="Section Heading"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with section heading', () => {
		const {container} = render(
			<CallToAction
				actionItems={basicActionItems}
				sectionHeading="Section Heading"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with disclaimer text', () => {
		const {container} = render(
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

		expect(container).toMatchSnapshot();
	});

	it('renders with an icon', () => {
		const {container} = render(
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

		expect(container).toMatchSnapshot();
	});

	it('renders with a message', () => {
		const {container} = render(
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

		expect(container).toMatchSnapshot();
	});

	it('renders with promotions', () => {
		const {container} = render(
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

		expect(container).toMatchSnapshot();
	});

	it('renders with promotions containing description', () => {
		const {container} = render(
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

		expect(container).toMatchSnapshot();
	});
});