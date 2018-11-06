import {getRequestById} from './api-helpers';

export function hasCreateTicketPermission(userTags) {
	return (
		userTags &&
		userTags.some(tag => tag === 'osb_customer' || tag === 'osb_partner')
	);
}

export function hasKBPermission(userTags) {
	return (
		userTags && userTags.includes('osb_kb')
	)
}

export function hasWatcherPermission(userTags, id, callback) {
	getRequestById(id)
		.then(
			({data}) => {
				const orgWatcherArray = userTags.filter(
					tag => tag.match(data.request.organization_id)
				);

				if (!orgWatcherArray.length) {
					callback();
				}
			}
		)
		.catch(
			err => {
				if (process.env.NODE_ENV === 'development') {
					console.log(err);
				}
			}
		);
}