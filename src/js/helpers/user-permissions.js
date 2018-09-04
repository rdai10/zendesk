export default function hasCreateTicketPermission(userTags) {
	return (
		userTags &&
		userTags.some(tag => tag === 'osb_customer' || tag === 'osb_partner')
	);
}