import {getRequestById} from './api-helpers';

/**
 * Returns a boolean for whether or not a user should be able to create a ticket
 * @param {string[]} userTags An array of a user's tags
 * @returns {boolean} Boolean value of whether or not the Osb Customer or Osb Partner tag exists
 */
export function hasCreateTicketPermission(userTags) {
	return (
		userTags &&
		userTags.some(tag => tag === 'osb_customer' || tag === 'osb_partner')
	);
}

/**
 * Returns a boolean for whether or not a user has the KB tag
 * @param {string[]} userTags An array of a user's tags
 * @returns {boolean} Boolean value of whether or not the KB tag exists
 */
export function hasKBPermission(userTags) {
	return userTags && userTags.some(tag => tag === 'osb_kb');
}

/**
 * Executes a callback function if the user is a Watcher for a given request or ticket
 * @param {string[]} userTags An array of a user's tags
 * @param {string} id The request id or ticket id
 * @param {function(object)} callback The callback function
 * @returns {function(object)} The callback function when the user has a Watcher tag for the request or ticket passed in
 */
export function hasWatcherPermission(userTags, id, callback) {
	getRequestById(id)
		.then(data => {
			const orgWatcherArray = userTags.filter(tag =>
				tag.match(data.request.organization_id)
			);

			if (!orgWatcherArray.length) {
				callback(data);
			}
		})
		.catch(err => {
			if (process.env.NODE_ENV === 'development') {
				console.error(err);
			}
		});
}
