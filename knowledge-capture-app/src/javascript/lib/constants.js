export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com'
		: 'https://liferaysupport1528999723.zendesk.com';

export const API_BASE_URL = `${BASE_URL}/api/v2/help_center`;

export const DEFAULT_LOCALE = 'en-US';

export const NEW_ARTICLE_URL = `${BASE_URL}/knowledge/articles/new`;

export const RESULTS_COUNT = 25;
