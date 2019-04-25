import preact from 'preact';
import PropTypes from 'prop-types';

import getCN from 'classnames';

import {
	getArticlesBySectionId,
	getSectionBySectionId,
	getSectionsByCategoryId
} from '../helpers/api-helpers';

// An artibuary large number to get all articles in one swoop

const NUMBER_OF_ARTICLES = 300;

class ArticlesList extends preact.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);

		this.state = {
			items: []
		};
	}

	componentDidMount() {
		if (this.props.expanded) {
			this.getArticles();
		}
	}

	componentDidUpdate(prevProp) {
		const {expanded} = this.props;

		if (prevProp.expanded != expanded && expanded) {
			this.getArticles();
		}
	}

	getArticles() {
		const {id, locale} = this.props;

		getArticlesBySectionId(id, locale, NUMBER_OF_ARTICLES)
			.then(
				({data}) => {
					this.setState(
						{
							items: data.articles
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

	render({currentArticleId, expanded}, {items}) {
		return (
			<div>
				{expanded && (
					<ul class="nav nav-nested" role="menu">
						{items.map(
							item => {
								const className = getCN(
									{
										'active': item.id === parseInt(currentArticleId, 10)
									},
									'nav-item'
								);

								return (
									<li class={className} key={item.id} id={item.id} role="none">
										<a class="sidenav-item" href={item.html_url} role="menuitem">
											{item.name}
										</a>
									</li>
								);
							}
						)}
					</ul>
				)}
			</div>
		);
	}
}

ArticlesList.PropTypes = {
	currentArticleId: PropTypes.string.isRequired,
	expanded: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	locale: PropTypes.string.isRequired
};

class DocSideNav extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			expandedItemId: parseInt(this.props.sectionId, 10),
			items: []
		};
	}

	componentDidMount() {
		const {locale, sectionId} = this.props;

		getSectionBySectionId(sectionId, locale)
			.then(
				({data}) => {
					return (
						getSectionsByCategoryId(
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
							items: data.sections
						}
					);
				}
			)
			.catch(
				(err) => {
					const sidenavFallback = document.getElementById(
						'sidenavFallback'
					);

					sidenavFallback.classList.add('show');

					if (process.env.NODE_ENV === 'development') {
						console.log(err);
					}
				}
			);
	}

	handleClick(event) {
		this.setState(
			{
				expandedItemId: parseInt(event.target.id, 10)
			}
		);
	}

	render({currentArticleId, locale}, {expandedItemId, items}) {
		return (
			<ul class="nav nav-nested">
				{items.map(
					item => {
						const expanded = expandedItemId === item.id;

						const className = getCN(
							{
								'expanded': expanded
							},
							'btn-unstyled',
							'sidenav-item'
						);

						return (
							<li class="nav-item" key={item.id}>
								<button aria-haspopup="true" class={className} id={item.id} onClick={this.handleClick} type="button">
									{item.name}
								</button>

								<ArticlesList
									currentArticleId={currentArticleId}
									expanded={expanded}
									id={item.id}
									locale={locale}
								/>
							</li>
						);
					}
				)}
			</ul>
		);
	}
}

DocSideNav.PropTypes = {
	currentArticleId: PropTypes.string.isRequired,
	locale: PropTypes.string.isRequired,
	sectionId: PropTypes.string.isRequired
};

export default DocSideNav;