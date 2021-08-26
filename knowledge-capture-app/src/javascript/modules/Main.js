import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/Global';
import { DEFAULT_LOCALE } from '../lib/constants';
import { API_ENDPOINTS } from '../lib/utility';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	const { client } = useGlobalContext();

	const [language, setLanguage] = useState('');
	const [searchResults, setSearchResults] = useState(data.searchResults);

	useEffect(async () => {
		if (language) {
			let search = { results: [] };

			try {
				search = await client.request(
					API_ENDPOINTS.search(data.ticketSubject, language)
				);
			} catch (error) {
				console.error(
					'Query for Search Results returned with the following error: ',
					error.status,
					error.statusText
				);
			}

			setSearchResults(search.results);
		}
	}, [language]);

	return (
		<>
			<SearchInput updater={setSearchResults} />

			<SearchFilters
				resultsDisplayed={searchResults.length}
				updateLanguage={setLanguage}
			/>

			<SearchResults results={searchResults} />
		</>
	);
}
