function convertToLiferayLocale(locale) {
	let retVal = '';

	if (locale == 'en-US') {
		retVal = 'en_US';
	} else if (locale == 'es') {
		retVal = 'es_ES';
	} else if (locale == 'ja') {
		retVal = 'ja_JP';
	} else if (locale == 'pt') {
		retVal = 'pt_BR';
	} else if (locale == 'zh-CN') {
		retVal = 'zh_CN';
	}

	return retVal;
}

export default function addLocaleParamToURI(locale, urn) {
	const url =
		process.env.NODE_ENV === 'production'
			? 'https://customer.liferay.com/'
			: 'https://customer-uat.liferay.com/';

	return url + convertToLiferayLocale(locale) + '/' + urn;
}
