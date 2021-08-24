/**
 * Displays a date object in the MDY format.
 * @param {Object|string} date Date to be formatted.
 * @returns {string} String representation of the date in MDY format
 */
 export function displayDateInMDYFormat(date) {
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(date));
}