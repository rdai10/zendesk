import preact from 'preact';
import PropTypes from 'prop-types';

import {
	getArticlesBySearch,
	getSectionBySectionId
} from '../helpers/api-helpers';

import LoadingIndicator from './LoadingIndicator';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

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
					const [categories] = data.categories;

					const breadcrumbData = [
						{
							name: categories.name,
							url: categories.html_url
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
				{!!breadcrumb.length && (
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

		this.displayNoResultsMsg = this.displayNoResultsMsg.bind(this);
		this.handlePaginationClick = this.handlePaginationClick.bind(this);
		this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);
		this.querySearchResults = this.querySearchResults.bind(this);
		this.updateResultsCount = this.updateResultsCount.bind(this);

		this.state = {
			loading: true,
			productLabel: '',
			results: [],
			totalPage: 0
		};
	}

	componentDidMount() {
		this.querySearchResults();
	}

	displayNoResultsMsg(bool) {
		const noResults = document.getElementById(
			'noResults'
		);

		if (bool) {
			noResults.classList.add('show');
		}
		else {
			noResults.classList.remove('show');
		}
	}

	handlePaginationClick(currentPage) {
		const {locale, queryString} = this.props;
		const {productLabel} = this.state;

		getArticlesBySearch(
			queryString,
			ARTICLES_PER_PAGE,
			currentPage,
			productLabel,
			locale
		)
			.then(
				({data}) => {
					this.setState(
						{
							results: data.results
						}
					);
				}
			)
			.catch(
				(err) => {
					if (process.env.NODE_ENV === 'development') {
						console.log(err);
					}

					this.setState(
						{
							loading: true
						}
					);
				}
			);

		window.scroll(0, 0);
	}

	handleSearchFilterChange(label) {
		this.setState(
			{
				loading: true,
				productLabel: label
			}
		);

		this.querySearchResults(label);
	}

	querySearchResults(label) {
		const {locale, queryString} = this.props;

		if (queryString) {
			getArticlesBySearch(queryString, ARTICLES_PER_PAGE, 1, label, locale)
				.then(
					({data}) => {
						this.setState(
							{
								loading: false,
								results: data.results,
								totalPage: data.page_count
							}
						);

						this.displayNoResultsMsg(
							!data.results.length
						);

						this.updateResultsCount(data.count);
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
			this.setState(
				{
					loading: false
				}
			);

			this.displayNoResultsMsg(true);
			this.updateResultsCount(0);
		}
	}

	updateResultsCount(count) {
		const searchResultsCount = document.getElementById('searchResultsCount');

		searchResultsCount.innerHTML = count;
	}

	render(
		{fastTrackLabel, filterLabel, filterOptions, locale},
		{loading, results, totalPage}
	) {
		return (
			<div>
				<SearchFilter
					label={filterLabel}
					onChange={this.handleSearchFilterChange}
					options={filterOptions}
				/>

				{!loading && !!results.length && (
					<ul class="search-results-list">
						{results.map(
							(result) => (
								<li key={result.id} class="search-result" id={result.id}>
									<div class="search-results-header">
										<a class="search-result-link semi-bold" href={result.html_url}>
											{result.title}

											{result.label_names.indexOf(
												'Fast Track'
											) >= 0 && (
												<span class="initiative-label label label-sm">
													{fastTrackLabel}
												</span>
											)}
										</a>
									</div>

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

				{!loading && totalPage > 1 && (
					<Pagination
						onClick={this.handlePaginationClick}
						total={totalPage}
					/>
				)}

				{loading && <LoadingIndicator />}
			</div>
		);
	}
}

SearchResults.PropTypes = {
	fastTrackLabel: PropTypes.string.isRequired,
	filterLabel: PropTypes.string.isRequired,
	filterOptions: PropTypes.arrayOf(
		PropTypes.shape(
			{
				displayName: PropTypes.string,
				value: PropTypes.string
			}
		)
	).isRequired,
	locale: PropTypes.string.isRequired,
	queryString: PropTypes.string.isRequired
};

export default SearchResults;