export const CLIENT = {
	_origin: 'zendesk.com',
	get: (prop) => {
		if (prop === 'currentUser') {
			return Promise.resolve({
				currentUser: {
					locale: 'en',
					name: 'Sample User',
				},
			});
		}
		if (prop === 'ticket.subject') {
			return Promise.resolve({
				errors: {},
				'ticket.subject': 'Sample Subject',
			});
		}
		return Promise.resolve({
			[prop]: null,
		});
	},
};

export const SEARCH = {
	count: 1,
	next_page: null,
	page: 1,
	page_count: 1,
	per_page: 25,
	previous_page: null,
	results: [
		{
			id: 360032695971,
			url: 'url',
			html_url: 'url',
			author_id: 123,
			comments_disabled: false,
			draft: false,
			promoted: false,
			position: 3,
			vote_sum: 0,
			vote_count: 0,
			section_id: 234,
			created_at: '2019-08-20T04:20:39Z',
			updated_at: '2020-12-05T16:53:38Z',
			name: 'Article Name 1',
			title: 'Article Name 1',
			source_locale: 'en-us',
			locale: 'en-us',
			outdated: false,
			outdated_locales: [],
			edited_at: '2020-12-05T16:53:38Z',
			user_segment_id: null,
			permission_group_id: 345,
			label_names: [],
			body: 'Article Body',
			snippet: 'Article Snippet',
			result_type: 'article',
		},
	],
};
