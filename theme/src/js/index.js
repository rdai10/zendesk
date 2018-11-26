import 'es6-promise/auto';

import '../css/main.scss';

import './vendor/zendesk-default-script';
import './vendor/zendesk-watcher-customization';

export {default as render} from './helpers/preact-renderer';
export {
	hasCreateTicketPermission,
	hasKBPermission,
	hasWatcherPermission
} from './helpers/user-permissions';
export {addLocaleParamToURI} from './helpers/locale-conversion';

export {default as throttle} from 'lodash.throttle';

export {MegaMenu} from 'liferay-help-center-megamenu';

export {default as Alert} from './components/Alert';
export {default as CallToAction} from './components/CallToAction';
export {default as DocSideNav} from './components/DocSideNav';
export {default as ProductTabs} from './components/ProductTabs';