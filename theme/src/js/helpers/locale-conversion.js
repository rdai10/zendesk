function convertToLiferayLocale(locale) {
	if (locale === 'en-US') {
		return 'en_US';
	} else if (locale === 'es') {
		return 'es_ES';
	} else if (locale === 'ja') {
		return 'ja_JP';
	} else if (locale === 'pt') {
		return 'pt_BR';
	} else if (locale === 'zh-CN') {
		return 'zh_CN';
	} else {
		return '';
	}
}

export function addLocaleParamToURI(locale, url, urn) {
	return url + '/' + convertToLiferayLocale(locale) + '/' + urn;
}