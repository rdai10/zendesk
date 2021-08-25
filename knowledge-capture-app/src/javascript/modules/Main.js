import React, { useState } from 'react';
import { DEFAULT_LOCALE } from '../lib/constants';

import ErrorBoundary from './ErrorBoundary';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	const [language, setLanguage] = useState(DEFAULT_LOCALE);
	const [searchResults, setSearchResults] = useState(data.searchResults);

	return (
		<ErrorBoundary>
			<SearchInput updater={setSearchResults} />

			<SearchFilters
				resultsDisplayed={searchResults.length}
				updateLanguage={setLanguage}
			/>

			<SearchResults results={searchResults} />
		</ErrorBoundary>
	);
}
