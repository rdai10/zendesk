import preact from 'preact';
import PropTypes from 'prop-types';

class SearchFilter extends preact.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const {onChange} = this.props;

		onChange(event.currentTarget.value);
	}

	render({label, options}) {
		return (
			<div class="search-filter">
				<label class="semi-bold" htmlFor='productSearchFilter'>
					{label}
				</label>

				<select class="col-md-3" id="productSearchFilter" onChange={this.handleChange}>
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
	onChange: PropTypes.func.isRequired,
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