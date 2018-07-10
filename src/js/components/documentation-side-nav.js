import preact from 'preact';

import * as apiHelpers from '../helpers/api-helpers.js';

class DisplayArticles extends preact.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			items: []
		}
	}

	componentDidMount() {
		apiHelpers.getArticlesBySectionId(this.props.locale, this.props.id)
		.then(
			({data}) => {this.setState({
				items: data,
				loading: false
			})
		})
		.catch(err => this.setState({loading: true}));
	}

	render() {
		const {items, loading} = this.state;

		if (loading) {
			return <span aria-hidden="true" class="loading-animation loading-animation-sm"></span>
		}
		else {
			return (
				<ul class="nav nav-nested">
					{items.articles.map(item => (
						<li class="nav-item" key={item.id}>
							<a class="sidenav-item" href={item.html_url}>{item.name}</a>
						</li>
						)
					)}
				</ul>
			);
		}
	}
}

export default class DocSideNav extends preact.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			error: false,
			loading: true,
			items: [],
			showArticles: false
		};
	}

	componentDidMount() {
		apiHelpers.getSectionsCategories(this.props.locale)
		.then(
			({data}) => {
			let productDocCategory = data.categories.find(item => item.name === "Product Documentation");

			if (productDocCategory.id) {
				let productDocSections = data.sections.filter(item => item.category_id === productDocCategory.id);

				this.setState({items: productDocSections});
			}
		})
		.catch(err => {
			this.setState({error: true});
		});

		this.setState({loading: false});
	}

	handleClick() {
		this.setState({
			active: true,
			showArticles: !this.state.showArticles
		});
	}

	render() {
		const {error, items, loading} = this.state;

		if (error) {
			const sidenavFallback = document.getElementById('sidenavFallback');

			sidenavFallback.classList.add('show');
		}
		else if (loading) {
			return <span aria-hidden="true" class="loading-animation loading-animation-sm"></span>
		}
		else {
			let className = this.state.active ? 'active nav-item': 'nav-item';

			return (
				<ul class="nav nav-nested">
					{items.map(item => (
						<li class={className} key={item.id}>
							<a class="sidenav-item" href="javascript:;" onClick={this.handleClick.bind(this)}>{item.name}</a>

							{this.state.showArticles ?
								<DisplayArticles id={item.id} locale={this.props.locale} /> :
								null
							}
						</li>
						)
					)}
				</ul>
			);
		}
	}
}