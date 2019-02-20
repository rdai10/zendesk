import preact from 'preact';
import {
	cleanup,
	debounceRenderingOff,
	fireEvent,
	render
} from 'preact-testing-library';

import Pagination from '../Pagination';

const setup = () => {
	const handleClick = jest.fn();

	const utils = render(
		<Pagination onClick={handleClick} perPage={10} total={100} />
	);

	const firstPage = utils.queryByText('«');
	const lastPage = utils.queryByText('»');
	const nextPage = utils.queryByText('›');
	const prevPage = utils.queryByText('‹');

	return {
		firstPage,
		lastPage,
		nextPage,
		prevPage,
		...utils
	};
};

afterEach(cleanup);

describe('Pagination', () => {
	it('renders correctly', () => {
		const {container} = setup();

		expect(container).toMatchSnapshot();
	});

	it('renders page one as the first page on initial load', () => {
		const {getByText} = setup();

		const page1 = getByText('1');

		expect(page1).toBeTruthy();
	});

	it('renders only next and last page controls on initial load', () => {
		const {firstPage, lastPage, nextPage, prevPage} = setup();

		expect(firstPage).toBeNull();
		expect(lastPage).toBeTruthy();
		expect(nextPage).toBeTruthy();
		expect(prevPage).toBeNull();
	});

	it('renders last page correctly', () => {
		debounceRenderingOff();

		const {lastPage, getByText} = setup();

		fireEvent.click(lastPage);

		const page100 = getByText('100');

		expect(page100).toBeTruthy();
	});

	it('renders only first and prev page controls on last page', () => {
		debounceRenderingOff();

		const {lastPage, queryByText} = setup();

		fireEvent.click(lastPage);

		const newFirstPage = queryByText('«');
		const newLastPage = queryByText('»');
		const newNextPage = queryByText('›');
		const newPrevPage = queryByText('‹');

		expect(newFirstPage).toBeTruthy();
		expect(newLastPage).toBeNull();
		expect(newNextPage).toBeNull();
		expect(newPrevPage).toBeTruthy();
	});

	it('renders all page controls when paginate on a page that is neither the first nor last page', () => {
		debounceRenderingOff();

		const {queryByText} = setup();

		fireEvent.click(queryByText('2'));

		const newFirstPage = queryByText('«');
		const newLastPage = queryByText('»');
		const newNextPage = queryByText('›');
		const newPrevPage = queryByText('‹');

		expect(newFirstPage).toBeTruthy();
		expect(newLastPage).toBeTruthy();
		expect(newNextPage).toBeTruthy();
		expect(newPrevPage).toBeTruthy();
	});

	it('renders a maximum of five pages previous to and after the current page', () => {
		debounceRenderingOff();

		const {container, queryByText} = setup();

		fireEvent.click(queryByText('6'));

		expect(container).toMatchSnapshot();
	});
});