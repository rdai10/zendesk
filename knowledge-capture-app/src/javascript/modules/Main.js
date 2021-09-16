import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@zendeskgarden/react-grid';
import { useGlobalContext } from '../context/Global';
import { DEFAULT_LOCALE } from '../lib/constants';
import { API_ENDPOINTS } from '../lib/utility';
import NewArticle from './NewArticle';
import NoResults from './NoResults';
import SearchFilters from './SearchFilters';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

export default function Main({ data }) {
	return <AppView data={data} />;
}

function View({ className, data }) {
	const { client } = useGlobalContext();
	const { locale, ticketId, ticketSubject } = data;

	const [keyword, setKeyword] = useState(ticketSubject);
	const [language, setLanguage] = useState(DEFAULT_LOCALE);
	const [search, setSearch] = useState(null);
	const [showAddArticle, setShowAddArticle] = useState(false);

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

	function handleShowAdd(val) {
		setShowAddArticle(val);
	}

	return (
		<div className={className}>
			{!showAddArticle && (
				<Grid id="primaryView">
					<SearchInput
						clickHandler={handleShowAdd}
						updateKeyword={setKeyword}
						value={keyword}
					/>

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

					{(keyword === '' ||
						(search && search.results.length === 0)) && (
						<NoResults clickHandler={handleShowAdd} />
					)}
				</Grid>
			)}

			{showAddArticle && (
				<NewArticle
					clickHandler={handleShowAdd}
					locale={locale}
					ticketId={ticketId}
				/>
			)}
		</div>
	);
}

const AppView = styled(View)`
	#primaryResults {
		flex: 1;
		overflow-y: auto;
	}

	#primaryView {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
`;
