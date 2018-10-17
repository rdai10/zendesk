import preact from 'preact';
import PropTypes from 'prop-types';

import getCN from 'classnames';

import * as apiHelpers from '../helpers/api-helpers';
import LoadingIndicator from './LoadingIndicator';

class ArticlesList extends preact.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);

		this.state = {
			items: [],
			loading: false
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

	render({currentArticleId, expanded}, {items, loading}) {
		return (
			<div>
				{expanded && !loading && (
					<ul class="nav nav-nested" role="menu">
						{items.map(
							item => {
								const className = getCN(
									{
										'active': item.id === parseInt(currentArticleId)
									},
									'nav-item'
								);

								return (
									<li class={className} key={item.id} id={item.id} role="none">
										<a class="sidenav-item" href={item.html_url} role="menuitem">
											{item.name}
										</a>
									</li>
								)
							}
						)}
					</ul>
				)}

				{loading && <LoadingIndicator />}
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
			expandedItemId: parseInt(this.props.sectionId),
			items: [],
			loading: true
		};
	}

	componentDidMount() {
		const {sectionId, locale} = this.props;

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

	handleClick(event) {
		this.setState(
			{
				expandedItemId: parseInt(event.target.id)
			}
		)
	}

	render({currentArticleId, locale}, {expandedItemId, items, loading}) {
		return loading ? (
			<LoadingIndicator />
		) : (
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
						)
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