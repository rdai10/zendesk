import preact from 'preact';
import PropTypes from 'prop-types';

import {getArticlesBySearchQuery, getSectionBySectionId} from '../helpers/api-helpers';

import LoadingIndicator from './LoadingIndicator';

class SearchResultBreadCrumb extends preact.Component {
	constructor(props) {
		super(props);

		this.state = {
			breadcrumb: [],
			loading: true
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
							breadcrumb: breadcrumbData,
							loading: false
						}
					);
				}
			)
			.catch(
				(err) => {
					this.setState(
						{
							loading: false
						}
					);

					if (process.env.NODE_ENV === 'development') {
						console.log(err);
					}
				}
			);
	}

	render() {
		const {breadcrumb, loading} = this.state;

		return (
			<div>
				{!loading && breadcrumb.length && (
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

				{loading && <LoadingIndicator />}
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

		this.showNoResultsMsg = this.showNoResultsMsg.bind(this);

		this.state = {
			loading: true,
			results: []
		};
	}

	componentDidMount() {
		const {queryString} = this.props;

		if (queryString) {
			getArticlesBySearchQuery(queryString)
				.then(
					({data}) => {
						if (!data.results.length) {
							this.showNoResultsMsg();
						}

						this.setState(
							{
								loading: false,
								results: data.results
							}
						);
					}
				)
				.catch(
					(err) => {
						this.showNoResultsMsg();

						this.setState(
							{
								loading: false
							}
						);

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

	showNoResultsMsg() {
		const noResults = document.getElementById(
			'noResults'
		);

		noResults.classList.add('show');
	}

	render({locale}, {loading, results}) {
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