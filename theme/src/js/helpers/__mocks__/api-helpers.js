export const getArticlesBySearch = jest.fn(() =>
	Promise.resolve({
		count: 1,
		next_page: null,
		page: 1,
		page_count: 1,
		per_page: 10,
		previous_page: null,
		results: [
			{
				id: 123,
				url: 'https://zendesk.com/api.json',
				html_url: 'https://zendkesk.com',
				position: 0,
				section_id: 456,
				name: 'Placeholder Article',
				title: 'Placeholder Article',
				source_locale: 'en-us',
				locale: 'en-us',
				label_names: [],
				body: '<p>This is a placeholder article.</p>',
				snippet: 'This is a placeholder article.',
				result_type: 'article'
			}
		]
	})
);

export const getArticlesBySectionId = jest.fn(() =>
	Promise.resolve({
		count: 1,
		next_page: null,
		page: 1,
		page_count: 1,
		per_page: 30,
		previous_page: null,
		articles: [
			{
				id: 123,
				url: 'https://zendesk.com/api.json',
				html_url: 'https://zendkesk.com',
				section_id: 456,
				name: 'Placeholder Article',
				title: 'Placeholder Article',
				source_locale: 'en-us',
				locale: 'en-us',
				label_names: [],
				body: '<p>Placeholder Content</p>'
			}
		],
		sort_by: 'position',
		sort_order: 'asc'
	})
);

export const getRequestById = jest.fn(() =>
	Promise.resolve({
		request: {
			organization_id: 123
		}
	})
);

export const getSectionBySectionId = jest.fn(() =>
	Promise.resolve({
		section: {
			id: 123,
			url: 'https://zendesk.com/api.json',
			html_url: 'https://zendesk.com',
			category_id: 456,
			name: 'Placeholder Section ',
			description: null,
			locale: 'en-us',
			source_locale: 'en-us',
			outdated: false,
			parent_section_id: null,
			theme_template: 'section_page'
		},
		categories: [
			{
				id: 789,
				url: 'https://zendesk.com/api.json',
				html_url: 'https://zendesk.com',
				name: 'commerce test',
				description: '',
				locale: 'en-us',
				source_locale: 'en-us'
			}
		]
	})
);

export const getSectionsByCategoryId = jest.fn(() =>
	Promise.resolve({
		sections: [
			{
				id: 123,
				url: 'https://zendesk.com/api.json',
				html_url: 'https://zendesk.com',
				category_id: 456,
				name: 'Placeholder Section',
				description: null,
				locale: 'en-us',
				source_locale: 'en-us'
			}
		],
		page: 1,
		previous_page: null,
		next_page: null,
		per_page: 30,
		page_count: 1,
		count: 1,
		sort_by: 'position',
		sort_order: 'asc'
	})
);
