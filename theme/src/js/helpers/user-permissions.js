import {getRequestById} from './api-helpers';

export function hasCreateTicketPermission(userTags) {
	return (
		userTags &&
		userTags.some(tag => tag === 'osb_customer' || tag === 'osb_partner')
	);
}

export function hasWatcherPermission(userTags, id, callback) {
	getRequestById(id)
		.then(({data}) => {
			const orgWatcherArray = userTags.filter(tag =>
				tag.match(data.request.organization_id)
			);

			if (!!!orgWatcherArray.length) {
				callback();
			}
		})
		.catch(err => {
			process.env.NODE_ENV === 'production' && console.log(err);
		});
}