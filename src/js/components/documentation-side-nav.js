import * as apiHelpers from '../helpers/api-helpers.js';
import preact from 'preact';

export default class DocSideNav extends preact.Component {
	constructor() {
		super();

		this.state = {
			expanded: false,
			error: false,
			loading: true,
			items: []
		}
	}

	componentDidMount() {
		apiHelpers.getSectionsCategories()
		.then(
			({data}) => {
			let productDocCategory = data.categories.find(item => item.name === "Product Documentation");

			if (productDocCategory.id) {
				let productDocSections = data.sections.filter(item => item.category_id === productDocCategory.id);

				this.setState({
					items: productDocSections,
					loading: false
				})
			}
		})
		.catch(err => {
			this.setState({
				error: true,
				loading: false
			}
			)
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
			return (
				<ul class="nav nav-nested">
					{items.map(item => (
						<li class="nav-item" key={item.id}>
							<a class="sidenav-item" href="javascript:;">{item.name}</a>
						</li>
						)
					)}
				</ul>
			)
		}
	}
}