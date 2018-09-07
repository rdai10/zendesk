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

		apiHelpers
			.getArticlesBySectionId(locale, id)
			.then(
				({data}) => {
					this.setState(
						{
							items: data,
							loading: false
						}
					);
				}
			)
			.catch(
				err => this.setState(
					{
						loading: false
					}
				)
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
						{items.articles.map(
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
	id: PropTypes.string,
	locale: PropTypes.string,
	name: PropTypes.string
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
		const {locale} = this.props;

		apiHelpers
			.getSectionsCategories(locale)
			.then(
				({data}) => {
					let productDocCategory = data.categories.find(
						item => item.name === 'Liferay Analytics Cloud'
					);

					if (productDocCategory.id) {
						let productDocSections = data.sections.filter(
							item => item.category_id === productDocCategory.id
						);

						this.setState(
							{
								items: productDocSections,
								loading: false
							}
						);
					}
				}
			)
			.catch(
				err => {
					const sidenavFallback = document.getElementById(
						'sidenavFallback'
					);

					this.setState(
						{
							loading: false
						}
					);

					sidenavFallback.classList.add('show');
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
	locale: PropTypes.string
};

export default DocSideNav;