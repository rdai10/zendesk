export const API_BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com/api/v2/help_center'
		: 'https://liferaysupport1528999723.zendesk.com/api/v2/help_center';

export const DEFAULT_LOCALE = 'en-US';

export const RESULTS_COUNT = 25;
