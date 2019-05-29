import preact from 'preact';
import PropTypes from 'prop-types';

import getCN from 'classnames';

import {CardMenu} from 'liferay-help-center-megamenu';

import Alert from './Alert';

const TabContent = ({cardMenuClassName, content}) => (
	<section aria-labelledby={content.ariaLabelledby} role="tabpanel">
		<CardMenu
			className={cardMenuClassName}
			configs={content.configs}
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
	)
};

class TabList extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.getContent = this.getContent.bind(this);

		this.state = {
			activeId: 'tab-0',
			content: this.getContent('tab-0')
		};
	}

	getContent(id) {
		return this.props.allContent.find(
			content => content.ariaLabelledby === id
		);
	}

	handleClick(event) {
		this.setState(
			{
				activeId: event.target.id,
				content: this.getContent(event.target.id)
			}
		);
	}

	render({alert, tabList}, {activeId, content}) {
		const alertBody = alert && alert.children ? (
				<span>
					{alert.children}{' '}
					{alert.linkText &&
						alert.url && (
							<a href={alert.url} title={alert.linkText}>
								{alert.linkText}
							</a>
						)}
				</span>
			) : null;

		return (
			<div>
				{alertBody && (
					<Alert
						children={alertBody}
						leadingText={alert.leadingText}
					/>
				)}

				{tabList && (
					<div class="products-landing-tabs">
						<ul class="nav nav-underline" role="tablist">
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

				{content && (
					<TabContent
						cardMenuClassName="products-landing-tab-content"
						content={content}
					/>
				)}
			</div>
		);
	}
}

TabList.PropTypes = {
	alert: PropTypes.shape(
		{
			children: PropTypes.node.isRequired,
			leadingText: PropTypes.string,
			linkText: PropTypes.string,
			url: PropTypes.string
		}
	),
	allContent: PropTypes.array.isRequired,
	tabList: PropTypes.arrayOf(
		PropTypes.shape(
			{
				id: PropTypes.string,
				name: PropTypes.string
			}
		)
	).isRequired
};

const ProductTabs = ({alert, fullAccess, productItems}) => {
	const displayData = productItems.filter(
		item => fullAccess ? item.tabAccess === 'kb' || item.tabAccess === 'all' : item.tabAccess === 'nonkb' || item.tabAccess === 'all'
	);

	const allContent = displayData.map(
		(item, index) => (
			{
				ariaLabelledby: `tab-${index}`,
				configs: item.configs
			}
		)
	);

	let tabList;

	if (displayData.some(item => item.name)) {
		tabList = displayData.map(
			(item, index) => (
				{
					id: `tab-${index}`,
					name: item.name
				}
			)
		);
	}

	return <TabList
		alert={alert}
		allContent={allContent}
		tabList={tabList}
	/>;
};

ProductTabs.PropTypes = {
	alert: PropTypes.shape(
		{
			children: PropTypes.node.isRequired,
			leadingText: PropTypes.string,
			linkText: PropTypes.string,
			url: PropTypes.string
		}
	),
	fullAccess: PropTypes.bool.isRequired,
	productItems: PropTypes.arrayOf(
		PropTypes.shape(
			{
				configs: PropTypes.object,
				name: PropTypes.string,
				tabAccess: PropTypes.oneOf(['all', 'kb', 'nonkb'])
			}
		)
	).isRequired
};

export default ProductTabs;