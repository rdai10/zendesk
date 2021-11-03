import 'es6-promise/auto';

import '../css/main.scss';

import './vendor/zendesk-default-script';
// import './vendor/zendesk-watcher-customization';

import './helpers/article-accordion';

export {default as render} from './helpers/preact-renderer';

export {makeGETRequest} from './helpers/api-helpers';
export {
	default as displayArticleSuggestion
} from './helpers/article-suggestion';
export {
	gateArticle,
	showArticleAttachments,
	showArticleFooter
} from './helpers/gated-content';
export {default as addLocaleParamToURI} from './helpers/locale-conversion';
export {
	default as showSiteWideNotification
} from './helpers/site-wide-notification';
export {
	hasCreateTicketPermission,
	hasKBPermission,
	hasWatcherPermission
} from './helpers/user-permissions';

export {default as debounce} from 'lodash.debounce';
export {default as throttle} from 'lodash.throttle';

export {MegaMenu} from 'liferay-help-center-megamenu';

export {default as Alert} from './components/Alert';
export {default as CallToAction} from './components/CallToAction';
export {default as DocSideNav} from './components/DocSideNav';
export {default as DocsTOC} from './components/DocTOC';
export {default as ProductTabs} from './components/ProductTabs';
export {default as SearchResults} from './components/SearchResults';
