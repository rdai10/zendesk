import preact from 'preact';
import PropTypes from 'prop-types';

import getCN from 'classnames';

import {CardMenu} from 'liferay-help-center-megamenu';

const TabContent = ({cardMenuClassName, content, layoutClassName}) => (
	<section aria-labelledby={content.ariaLabelledby} class={layoutClassName} role="tabpanel">
		<CardMenu
			className={cardMenuClassName}
			configs={content.configs}
			type="product"
		/>
	</section>
);

TabContent.PropTypes = {
	cardMenuClassName: PropTypes.string,
	content: PropTypes.objectOf(
		PropTypes.shape(
			{
				ariaLabelledby: PropTypes.string,
				configs: PropTypes.object
			}
		)
	),
	layoutClassName: PropTypes.string
};

class TabList extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.setContent = this.setContent.bind(this);

		this.state = {
			activeId: 'tab-0',
			content: this.setContent('tab-0')
		};
	}

	handleClick(event) {
		this.setState(
			{
				activeId: event.target.id,
				content: this.setContent(event.target.id)
			}
		);
	}

	setContent(id) {
		return this.props.contentArray.find(
			content => content.ariaLabelledby === id
		);
	}

	render({tabList}, {activeId, content}) {
		return (
			<div class="row">
				{tabList && (
					<div class="col-md-3 products-landing-tablist">
						<ul class="nav nav-stacked" role="tablist">
							{tabList.map(
								tab => {
									const className = getCN(
										{
											'active': tab.id === activeId
										},
										'btn',
										'btn-unstyled',
										'nav-link'
									);

									return (
										<li class="nav-item" key={tab.id} role="presentation">
											<button class={className} id={tab.id} onClick={this.handleClick} role="tab" type="button">
												{tab.name}
											</button>
										</li>
									);
								}
							)}
						</ul>
					</div>
				)}

				<TabContent
					cardMenuClassName={
						tabList ? 
							'products-landing-tab-content' :
							'products-landing'
						}
					content={content}
					layoutClassName={
						tabList ? 
							'col-md-9' :
							'col-md-12'
						}
				/>
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

const ProductTabs = ({kbPermission, productItems}) => {
	const contentArray = productItems.map(
		(item, index) => (
			{
				ariaLabelledby: `tab-${index}`,
				configs: item.configs
			}
		)
	);

	let tabList;

	if (productItems.some(item => item.name)) {
		tabList = productItems.map(
			(item, index) => (
				{
					id: `tab-${index}`,
					name: item.name
				}
			)
		);
	}

	return <TabList
		contentArray={contentArray}
		tabList={tabList}
	/>;
};

ProductTabs.PropTypes = {
	kbPermission: PropTypes.bool.isRequired,
	productItems: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.shape(
				{
					configs: PropTypes.object,
					name: PropTypes.string
				}
			)
		)
	).isRequired
};

export default ProductTabs;