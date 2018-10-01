import "es6-promise/auto";

import '../css/main.scss';

import './vendor/zendesk-default-script';
import './vendor/zendesk-watcher-customization';

export {default as render} from './helpers/preact-renderer';
export {
	hasCreateTicketPermission,
	hasWatcherPermission
} from './helpers/user-permissions';
export {default as throttle} from 'lodash.throttle';

export {default as Alert} from './components/Alert';
export {default as CallToAction} from './components/CallToAction';
export {default as CardMenu} from './components/CardMenu';
export {default as DocSideNav} from './components/DocSideNav';
export {default as MegaMenu} from './components/MegaMenu';
export {default as ProductTabs} from './components/ProductTabs';