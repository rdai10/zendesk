import preact from 'preact';
import PropTypes from 'prop-types';

import CardMenu from './CardMenu';

const TabContent = ({content}) => (
	<section
		aria-labelledby={content.ariaLabelledby}
		class="col-md-9"
		role="tabpanel"
	>
		<CardMenu
			className="products-landing-tab-content"
			configs={content.configs}
			type="product"
		/>
	</section>
);

TabContent.PropTypes = {
	content: PropTypes.objectOf(
		PropTypes.shape(
			{
				ariaLabelledby: PropTypes.string,
				configs: PropTypes.object
			}
		)
	)
};

class TabList extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.setContent = this.setContent.bind(this);

		this.state = {
			content: {}
		};

		this.setState(
			{
				content: this.setContent("tab-0")
			}
		)
	}

	handleClick(event) {
		this.setState(
			{
				content: this.setContent(event.target.id)
			}
		);
	}

	setContent(id) {
		return this.props.contentArray.find(
			content => content.ariaLabelledby === id
		);
	}

	render({tabList}, {content}) {
		return (
			<div class="row">
				<div class="col-md-3 products-landing-tablist">
					<ul class="nav nav-stacked" role="tablist">
						{tabList.map(
							tab => (
								<li
									key={tab.id}
									class="nav-item"
									role="presentation"
								>
									<button
										class="btn btn-unstyled nav-link"
										id={tab.id}
										onClick={this.handleClick}
										role="tab"
										type="button"
									>
										{tab.name}
									</button>
								</li>
							)
						)}
					</ul>
				</div>

				<TabContent content={content} />
			</div>
		);
	}
}

TabList.PropTypes = {
	contentArray: PropTypes.array.isRequired,
	tabList: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.shape(
				{
					id: PropTypes.string,
					name: PropTypes.string
				}
			)
		)
	).isRequired
};

const ProductTabs = ({productItems}) => {
	const contentArray = productItems.map(
		(item, index) => (
			{
				ariaLabelledby: `tab-${index}`,
				configs: item.configs
			}
		)
	);

	const tabList = productItems.map(
		(item, index) => (
			{
				id: `tab-${index}`,
				name: item.name
			}
		)
	);

	return <TabList contentArray={contentArray} tabList={tabList} />;
};

ProductTabs.PropTypes = {
	productItems: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.shape(
				{
					name: PropTypes.string,
					configs: PropTypes.object
				}
			)
		)
	).isRequired
};

export default ProductTabs;