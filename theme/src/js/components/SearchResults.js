import preact from 'preact';
import PropTypes from 'prop-types';

import {getArticlesBySearchQuery, getSectionBySectionId} from '../helpers/api-helpers';

import LoadingIndicator from './LoadingIndicator';
import Pagination from './Pagination';

const ARTICLES_PER_PAGE = 10;

class SearchResultBreadCrumb extends preact.Component {
	constructor(props) {
		super(props);

		this.state = {
			breadcrumb: []
		};
	}

	componentDidMount() {
		const {id, locale} = this.props;

		getSectionBySectionId(id, locale, 'categories')
			.then(
				({data}) => {
					const breadcrumbData = [
						{
							name: data.categories[0].name,
							url: data.categories[0].html_url
						},
						{
							name: data.section.name,
							url: data.section.html_url
						}
					];

					this.setState(
						{
							breadcrumb: breadcrumbData
						}
					);
				}
			)
			.catch(
				(err) => {
					if (process.env.NODE_ENV === 'development') {
						console.log(err);
					}
				}
			);
	}

	render() {
		const {breadcrumb} = this.state;

		return (
			<div>
				{breadcrumb.length && (
					<ol class="breadcrumbs">
						{breadcrumb.map(
							(data, index) => (
								<li key={index} title={data.name}>
									<a href={data.url}>{data.name}</a>
								</li>
							)
						)}
					</ol>
				)}
			</div>
		);
	}
}

SearchResultBreadCrumb.PropTypes = {
	id: PropTypes.string.isRequired,
	locale: PropTypes.string.isRequired
};

class SearchResults extends preact.Component {
	constructor(props) {
		super(props);

		this.handlePaginationClick = this.handlePaginationClick.bind(this);
		this.showNoResultsMsg = this.showNoResultsMsg.bind(this);

		this.state = {
			loading: true,
			results: [],
			totalPage: 0
		};
	}

	componentDidMount() {
		const {queryString} = this.props;

		if (queryString) {
			getArticlesBySearchQuery(queryString, ARTICLES_PER_PAGE)
				.then(
					({data}) => {
						if (!data.results.length) {
							this.showNoResultsMsg();
						}

						this.setState(
							{
								loading: false,
								results: data.results,
								totalPage: data.page_count
							}
						);
					}
				)
				.catch(
					(err) => {
						if (process.env.NODE_ENV === 'development') {
							console.log(err);
						}
					}
				);
		}
		else {
			this.showNoResultsMsg();

			this.setState(
				{
					loading: false
				}
			);
		}
	}

	handlePaginationClick(queryString, ARTICLES_PER_PAGE) {
		const {currentPage} = this.state;

		getArticlesBySearchQuery(queryString, ARTICLES_PER_PAGE, currentPage)
			.then(
				({data}) => data.results
			)
			.catch(
				(err) => {
					if (process.env.NODE_ENV === 'development') {
						console.log(err);
					}

					return '';
				}
			);
	}

	showNoResultsMsg() {
		const noResults = document.getElementById(
			'noResults'
		);

		noResults.classList.add('show');
	}

	render({locale, queryString}, {loading, results, totalPage}) {
		return (
			<div>
				{!loading && !!results.length && (
					<ul class="search-results-list">
						{results.map(
							(result, index) => (
								<li key={index} class="search-result">
									<a class="search-result-link" href={result.html_url}>{result.title}</a>

									<h5 class="search-result-description"
										dangerouslySetInnerHTML={{__html: result.snippet}} />

									<SearchResultBreadCrumb
										id={result.section_id}
										locale={locale}
									/>
								</li>
							)
						)}
					</ul>
				)}

				{!loading &&
					totalPage > 1 && (
						<Pagination
							onClick={this.handlePaginationClick(queryString, ARTICLES_PER_PAGE)}
							perPage={ARTICLES_PER_PAGE}
							total={totalPage}
						/>
					)}

				{loading && <LoadingIndicator />}
			</div>
		);
	}
}

SearchResults.PropTypes = {
	locale: PropTypes.string.isRequired,
	queryString: PropTypes.string.isRequired
};

export default SearchResults;