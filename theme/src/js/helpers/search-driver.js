import {SearchDriver} from '@elastic/search-ui';
import SiteSearchAPIConnector from '@elastic/search-ui-site-search-connector';

const ENGINE_KEY = '7wyqV3a8RsBFxxx2MVeQ';

const apiConnector = new SiteSearchAPIConnector({
	documentType: 'page',
	engineKey: ENGINE_KEY
});

const driver = new SearchDriver({
	apiConnector: apiConnector
});

export default driver;
