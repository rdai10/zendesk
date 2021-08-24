import { displayDateInMDYFormat } from '../src/javascript/lib/utility';

describe('displayDateInMDYFormat', () => {
	it('takes a string and returns a formatted date string', () => {
		expect(displayDateInMDYFormat('2021-08-24T20:31:40.848Z')).toBe(
			'August 24, 2021'
		);
	});

	it('takes a date object and returns a formatted date string', () => {
		expect(displayDateInMDYFormat(new Date(0))).toBe('December 31, 1969');
	});
});
