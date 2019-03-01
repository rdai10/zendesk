import preact from 'preact';
import {cleanup, render} from 'preact-testing-library';

import CallToAction from '../CallToAction';

afterEach(cleanup);

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
		const {container} = render(
			<CallToAction actionItems={basicActionItems} />
		);

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
		const {container, getByText} = render(
			<CallToAction
				actionItems={basicActionItems}
				sectionHeading="Section Heading"
			/>
		);

		const sectionHeading = getByText('Section Heading');

		expect(sectionHeading).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with disclaimer text', () => {
		const {container, getByText} = render(
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

		const disclaimer = getByText('This is a disclaimer.');

		expect(disclaimer).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with an icon', () => {
		const {container, getByRole} = render(
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

		const icon = getByRole('img');

		expect(icon).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with a message', () => {
		const {container, getByText} = render(
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

		const message = getByText('Message');

		expect(message).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with promotions', () => {
		const {container, getByText} = render(
			<CallToAction
				actionItems={basicActionItems}
				promotions={[
					{
						name: 'Promotion Name 1',
						url: '/'
					},
					{
						name: 'Promotion Name 2',
						url: '/'
					}
				]}
			/>
		);

		const promotion1 = getByText('Promotion Name 1');
		const promotion2 = getByText('Promotion Name 2');

		expect(promotion1).toBeTruthy();
		expect(promotion2).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders with promotions containing description', () => {
		const {container, getByText} = render(
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

		const promotionDescription = getByText('Promotion Description');

		expect(promotionDescription).toBeTruthy();
		expect(container).toMatchSnapshot();
	});
});