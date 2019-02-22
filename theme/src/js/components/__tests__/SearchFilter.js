import preact from 'preact';
import {cleanup, fireEvent, render} from 'preact-testing-library';

import SearchFilter from '../SearchFilter';

const setup = () => {
	const onChange = jest.fn();

	const options = [
		{
			displayName: 'Option 1',
			value: 'one'
		},
		{
			displayName: 'Option 2',
			value: 'two'
		}
	];

	const utils = render(
		<SearchFilter
			label="Search Filter"
			onChange={onChange}
			options={options}
		/>
	);

	return {
		onChange,
		...utils
	};
};

afterEach(cleanup);

describe('SearchFilter', () => {
	it('renders correctly', () => {
		const {container} = setup();

		expect(container).toMatchSnapshot();
	});

	it('populates select options', () => {
		const {getByValue} = setup();

		const option1 = getByValue('one');
		const option2 = getByValue('two');

		expect(option1).toBeDefined();
		expect(option2).toBeDefined();
	});

	it('does something when a new option is selected', () => {
		const {container, onChange} = setup();

		const filter = container.querySelector('select');

		fireEvent.change(filter, { target: { value: 'Option 2' } });

		expect(onChange).toHaveBeenCalledTimes(1);
	});
});