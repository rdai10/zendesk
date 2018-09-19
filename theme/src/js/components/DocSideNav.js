import preact from 'preact';
import PropTypes from 'prop-types';

import * as apiHelpers from '../helpers/api-helpers';
import LoadingIndicator from './LoadingIndicator';

class ArticlesList extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			expanded: false,
			items: [],
			loading: false
		};
	}

	getArticles() {
		const {id, locale} = this.props;

		this.setState(
			{
				loading: true
			}
		);

		apiHelpers.getArticlesBySectionId(id, locale)
			.then(
				({data}) => {
					this.setState(
						{
							items: data.articles,
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

	handleClick() {
		this.setState(
			{
				expanded: !this.state.expanded
			}
		);

		if (!this.state.items.length) {
			this.getArticles();
		}
	}

	render({name}, {expanded, items, loading}) {
		return (
			<div>
				<a
					class="sidenav-item"
					href="javascript:;"
					onClick={this.handleClick}
				>
					{name}
				</a>

				{expanded && !loading && (
					<ul class="nav nav-nested">
						{items.map(
							item => (
								<li class="nav-item" key={item.id}>
									<a
										class="sidenav-item"
										href={item.html_url}
									>
										{item.name}
									</a>
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

ArticlesList.PropTypes = {
	id: PropTypes.string.isRequired,
	locale: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

class DocSideNav extends preact.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			loading: true
		};
	}

	componentDidMount() {
		const {locale, sectionId} = this.props;

		apiHelpers
			.getSectionBySectionId(sectionId, locale)
			.then(
				({data}) => {
					return (
						apiHelpers.getSectionsByCategoryId(
							data.section.category_id,
							locale
						)
					);
				}
			)
			.then(
				({data}) => {
					this.setState(
						{
							items: data.sections,
							loading: false
						}
					);
				}
			)
			.catch(
				(err) => {
					const sidenavFallback = document.getElementById(
						'sidenavFallback'
					);

					this.setState(
						{
							loading: false
						}
					);

					sidenavFallback.classList.add('show');

					if (process.env.NODE_ENV === 'development') {
						console.log(err);
					}
				}
			);
	}

	render({locale}, {items, loading}) {
		return loading ? (
			<LoadingIndicator />
		) : (
			<ul class="nav nav-nested">
				{items.map(
					item => (
						<li class="nav-item" key={item.id}>
							<ArticlesList
								id={item.id}
								locale={locale}
								name={item.name}
							/>
						</li>
					)
				)}
			</ul>
		);
	}
}

DocSideNav.PropTypes = {
	locale: PropTypes.string.isRequired,
	sectionId: PropTypes.string.isRequired
};

export default DocSideNav;