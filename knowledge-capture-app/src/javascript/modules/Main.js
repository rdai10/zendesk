import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	return (
		<ErrorBoundary>
			<SearchResults results={data.searchResults} />
		</ErrorBoundary>
	);
}
