import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from '../modules/app';

const client = ZAFClient.init();

client.on('app.registered', function (appData) {
	return new App(client, appData);
});
