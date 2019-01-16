import preact from 'preact';
import PropTypes from 'prop-types';

import times from 'lodash.times';

const PAGE_BUFFER = 5;

class PaginationItem extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		const {onClick} = this.props;

		onClick(event.currentTarget.value);
	}

	render({items}) {
		return (
			<ul>
				{items.map(item => (
					<li class={`pagination-${item.position}`}>
						{item.position !== 'current' && (
							<button class="btn-unstyled" onClick={this.handleClick} type="button" value={item.value}>
								{item.value}
							</button>
						)}

						{item.position === 'current' && (
							<span>{item.value}</span>
						)}
					</li>
				))}
			</ul>
		);
	}
}

PaginationItem.PropTypes = {
	items: PropTypes.shape(
		{
			position: PropTypes.oneOfType(
				[
					PropTypes.number,
					PropTypes.oneOf(
						['current', 'first', 'last', 'next', 'prev']
					)
				]
			),
			url: PropTypes.string,
			value: PropTypes.oneOfType(
				[PropTypes.number, PropTypes.string]
			).isRequired
		}
	),
	onClick: PropTypes.func.isRequired
};

class Pagination extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.setBuffers = this.setBuffers.bind(this);
		this.setPages = this.setPages.bind(this);

		this.state = {
			currentPage: 1
		};
	}

	handleClick(page) {
		this.setState(
			{
				currentPage: parseInt(page)
			}
		)
	}

	setBuffers() {
		const {total} = this.props;
		const {currentPage} = this.state;

		let nextPageBuffer = PAGE_BUFFER;
		let prevPageBuffer = 0;

		if (currentPage > 1) {
			prevPageBuffer =
				currentPage > PAGE_BUFFER ? PAGE_BUFFER : currentPage - 1;

			if (currentPage === total) {
				nextPageBuffer = 0;
			} else {
				nextPageBuffer =
					total - currentPage >= PAGE_BUFFER
						? PAGE_BUFFER
						: total - currentPage;
			}
		}

		return {prevPageBuffer, nextPageBuffer};
	}

	setPages() {
		const {currentPage} = this.state;

		const {prevPageBuffer, nextPageBuffer} = this.setBuffers();

		const startPage = currentPage - prevPageBuffer;
		const totalPages = nextPageBuffer + prevPageBuffer + 1;

		const pages = times(totalPages, i => {
			const value = startPage + i;

			return {
				position: value === currentPage ? 'current' : value,
				url: '/',
				value: value
			};
		});

		if (prevPageBuffer) {
			pages.unshift(
				{
					position: 'first',
					url: '/',
					value: '«'
				},
				{
					position: 'prev',
					url: '/',
					value: '‹'
				}
			);
		}

		if (nextPageBuffer) {
			pages.push(
				{
					position: 'next',
					url: '/',
					value: '›'
				},
				{
					position: 'last',
					url: '/',
					value: '»'
				}
			);
		}

		return pages;
	}

	render() {
		return (
			<nav class="pagination">
				<PaginationItem items={this.setPages()} onClick={this.handleClick} />
			</nav>
		);
	}
}

Pagination.PropTypes = {
	onClick: PropTypes.func.isRequired,
	perPage: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired
};

export default Pagination;