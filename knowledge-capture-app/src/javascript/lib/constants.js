export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://help.liferay.com'
		: 'https://liferaysupport1528999723.zendesk.com';

export const API_BASE_URL = `${BASE_URL}/api/v2/help_center`;

export const DEFAULT_LOCALE = 'en-us';

export const NEW_ARTICLE_URL = `${BASE_URL}/knowledge/articles/new`;

export const RESULTS_COUNT = 25;

// app location

export const MODAL = 'modal';
export const TICKET_SIDEBAR = 'ticket_sidebar';

// modal dimensions
export const MAX_RECOMMENDED_HEIGHT = '80vh';
export const MAX_RECOMMENDED_WIDTH = '80vw';

// hard coded template IDs

export const DXPC_FAST_TRACK_ID =
	process.env.NODE_ENV === 'production' ? '360041188851' : '360027863431';
export const FAST_TRACK_ID =
	process.env.NODE_ENV === 'production' ? '360024794552' : '4408854935693';
