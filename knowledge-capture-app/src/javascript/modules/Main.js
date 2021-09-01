import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/Global';
import { DEFAULT_LOCALE } from '../lib/constants';
import { API_ENDPOINTS } from '../lib/utility';
import NoResults from './NoResults';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	const { client } = useGlobalContext();
	const { ticketSubject } = data;

	const [keyword, setKeyword] = useState(ticketSubject);
	const [language, setLanguage] = useState(DEFAULT_LOCALE);
	const [search, setSearch] = useState(null);

	useEffect(async () => {
		let search = null;

		if (keyword !== '') {
			try {
				search = await client.request(
					API_ENDPOINTS.search(keyword, language)
				);
			} catch (error) {
				console.error(
					'Query for Search Results returned with the following error: ',
					error.status,
					error.statusText
				);
			}
		}

		setSearch(search);
	}, [keyword, language]);

	return (
		<>
			<SearchInput updateKeyword={setKeyword} value={keyword} />

			<SearchFilters
				resultsDisplayed={search ? search.results.length : 0}
				updateLanguage={setLanguage}
			/>

			{search && search.results.length > 0 && (
				<SearchResults
					categories={search.categories}
					results={search.results}
					sections={search.sections}
				/>
			)}

			{(keyword === '' || (search && search.results.length === 0)) && (
				<NoResults />
			)}
		</>
	);
}
