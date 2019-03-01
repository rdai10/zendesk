import preact from 'preact';
import PropTypes from 'prop-types';

import times from 'lodash.times';

const PAGE_BUFFER = 5;

class PaginationItem extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const {number, onClick} = this.props;

		onClick(number);
	}

	render({active, label, number}) {
		return (
			<li class={active ? 'pagination-current' : ''}>
				{!active && (
					<button aria-label={`go to page ${label}`} class="btn-unstyled" onClick={this.handleClick} type="button" value={number}>
						{label}
					</button>
				)}

				{active && (
					<span aria-current="true" aria-label={`current page, page ${label}`}>{label}</span>
				)}
			</li>
		);
	}
}

PaginationItem.PropTypes = {
	active: PropTypes.bool,
	label: PropTypes.oneOfType(
		[PropTypes.number, PropTypes.string]
	),
	number: PropTypes.number,
	onClick: PropTypes.func.isRequired
};

class Pagination extends preact.Component {
	constructor(props) {
		super(props);

		this.getPages = this.getPages.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.setBuffers = this.setBuffers.bind(this);

		this.state = {
			currentPage: 1
		};
	}

	getPages() {
		const {total} = this.props;
		const {currentPage} = this.state;

		const {nextPageBuffer, prevPageBuffer} = this.setBuffers();

		const startPage = currentPage - prevPageBuffer;
		const totalPages = nextPageBuffer + prevPageBuffer + 1;

		const pages = times(
			totalPages,
			i => {
				const pageNumber = startPage + i;

				return {
					label: pageNumber,
					number: pageNumber
				};
			}
		);

		if (nextPageBuffer) {
			pages.push(
				{
					label: '›',
					number: (currentPage + 1)
				},
				{
					label: '»',
					number: total
				}
			);
		}

		if (prevPageBuffer) {
			pages.unshift(
				{
					label: '«',
					number: 1
				},
				{
					label: '‹',
					number: (currentPage - 1)
				}
			);
		}

		return pages;
	}

	handleClick(activePage) {
		const {onClick} = this.props;

		this.setState(
			{
				currentPage: activePage
			}
		);

		onClick(activePage);
	}

	setBuffers() {
		const {total} = this.props;
		const {currentPage} = this.state;

		let nextPageBuffer = PAGE_BUFFER;
		let prevPageBuffer = 0;

		if (currentPage > 1) {
			prevPageBuffer = currentPage > PAGE_BUFFER ? PAGE_BUFFER : currentPage - 1;

			if (currentPage === total) {
				nextPageBuffer = 0;
			}
		}
		else {
			nextPageBuffer = total - currentPage >= PAGE_BUFFER ? PAGE_BUFFER : total - currentPage;
		}

		return {
			nextPageBuffer,
			prevPageBuffer
		};
	}

	render() {
		return (
			<nav aria-label="pagination navigation" class="pagination" role="navigation">
				<ul>
					{this.getPages().map(
						page => (
							<PaginationItem
								active={this.state.currentPage === page.number}
								label={page.label}
								number={page.number}
								onClick={this.handleClick}
							/>
						)
					)}
				</ul>
			</nav>
		);
	}
}

Pagination.PropTypes = {
	onClick: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired
};

export default Pagination;