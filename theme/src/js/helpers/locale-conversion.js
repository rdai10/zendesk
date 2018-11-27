function convertToLiferayLocale(locale) {
	let retVal = '';

	if (locale == 'en-US') {
		retVal = 'en_US';
	}
	else if (locale == 'es') {
		retVal = 'es_ES';
	}
	else if (locale == 'ja') {
		retVal = 'ja_JP';
	}
	else if (locale == 'pt') {
		retVal = 'pt_BR';
	}
	else if (locale == 'zh-CN') {
		retVal = 'zh_CN';
	}

	return retVal;
}

export function addLocaleParamToURI(locale, url, urn) {
	return url + '/' + convertToLiferayLocale(locale) + '/' + urn;
}