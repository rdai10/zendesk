import preact from 'preact';
import PropTypes from 'prop-types';

class SearchFilter extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const {onClick} = this.props;

		onClick(event.currentTarget.value);
	}

	render({label, options}) {
		return (
			<div class="search-filter">
				<label class="semibold" htmlFor='productSearchFilter'>
					{label}
				</label>

				<select class="col-md-3" id="productSearchFilter" onClick={this.handleClick}>
					{options.map(
						(option, index) => (
							<option key={index} value={option.value}>
								{option.displayName}
							</option>
						)
					)}
				</select>
			</div>
		);
	}
}

SearchFilter.PropTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape(
			{
				displayName: PropTypes.string,
				value: PropTypes.string
			}
		)
	).isRequired
};

export default SearchFilter;