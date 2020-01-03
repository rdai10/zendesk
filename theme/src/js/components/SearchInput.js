import preact from 'preact';
import PropTypes from 'prop-types';

import driver from '../helpers/search-driver';

class SearchInput extends preact.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			count: 0,
			queryString: this.props.queryString
		};
	}

	handleChange(event) {
		const queryString = event.currentTarget.value;

		driver.actions.setSearchTerm(queryString);

		this.setState({
			queryString: queryString
		});
	}

	render({inputPlaceholder = '', resultsMsg}, {queryString}) {
		return (
			<header>
				<h2 class='display'>
					<span id='searchResultsCount'>{this.state.count}</span>{' '}
					{resultsMsg}
				</h2>

				<div class='search-lg'>
					<input
						aria-label='Search'
						autocomplete='off'
						id='query'
						name='query'
						onChange={this.handleChange}
						placeholder={inputPlaceholder}
						type='search'
						value={queryString}
					/>
				</div>
			</header>
		);
	}
}

SearchInput.PropTypes = {
	inputPlaceholder: PropTypes.string,
	queryString: PropTypes.string,
	resultsMsg: PropTypes.string.isRequired
};

export default SearchInput;
