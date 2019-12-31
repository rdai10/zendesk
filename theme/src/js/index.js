import 'es6-promise/auto';

import '../css/main.scss';

import './vendor/zendesk-default-script';
import './vendor/zendesk-watcher-customization';

import './helpers/article-accordion';

export {default as render} from './helpers/preact-renderer';

export {makeGETRequest} from './helpers/api-helpers';
export {displayArticleSuggestion} from './helpers/article-suggestion';
export {addLocaleParamToURI} from './helpers/locale-conversion';
export {
	hasCreateTicketPermission,
	hasKBPermission,
	hasWatcherPermission
} from './helpers/user-permissions';

export {default as searchDriver} from './helpers/search-driver';

export {default as debounce} from 'lodash.debounce';
export {default as throttle} from 'lodash.throttle';

export {MegaMenu} from 'liferay-help-center-megamenu';

export {default as Alert} from './components/Alert';
export {default as CallToAction} from './components/CallToAction';
export {default as DocSideNav} from './components/DocSideNav';
export {default as DocsTOC} from './components/DocTOC';
export {default as ProductTabs} from './components/ProductTabs';
export {default as SearchResults} from './components/SearchResults';
