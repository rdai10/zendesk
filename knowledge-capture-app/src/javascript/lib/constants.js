export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com'
		: 'https://liferaysupport1528999723.zendesk.com';

export const API_BASE_URL = `${BASE_URL}/api/v2/help_center`;

export const DEFAULT_LOCALE = 'en-US';

export const NEW_ARTICLE_URL = `${BASE_URL}/knowledge/articles/new`;

export const RESULTS_COUNT = 25;

// hard coded template IDs

export const DXPC_FAST_TRACK_ID =
	process.env.NODE_ENV === 'production' ? '360041188851' : '360027863431';

export const FAST_TRACK_ID =
	process.env.NODE_ENV === 'production' ? '360024794552' : '360038699972';
