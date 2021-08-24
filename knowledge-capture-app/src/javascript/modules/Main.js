import React, { useState } from 'react';

import ErrorBoundary from './ErrorBoundary';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	const [searchResults, setSearchResults] = useState(data.searchResults);

	return (
		<ErrorBoundary>
			<SearchInput updater={setSearchResults} />

			<SearchFilters resultsDisplayed={searchResults.length} />

			<SearchResults results={searchResults} />
		</ErrorBoundary>
	);
}
