import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/Global';
import { API_ENDPOINTS } from '../lib/utility';
import NoResults from './NoResults';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	const { client } = useGlobalContext();

	const { searchData, ticketSubject } = data;

	const [keyword, setKeyword] = useState(data.ticketSubject);
	const [language, setLanguage] = useState('');
	const [search, setSearch] = useState(searchData);

	useEffect(async () => {
		if (language) {
			let search = null;

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

			setSearch(search);
		}
	}, [language]);

	return (
		<>
			<SearchInput
				placeholder={ticketSubject}
				updateKeyword={setKeyword}
			/>

			<SearchFilters
				resultsDisplayed={search ? search.results.length : 0}
				updateLanguage={setLanguage}
			/>

			{!!search ? (
				<SearchResults
					categories={search.categories}
					results={search.results}
					sections={search.sections}
				/>
			) : (
				<NoResults />
			)}
		</>
	);
}
