import preact from 'preact';
import PropTypes from 'prop-types';

class DocTOC extends preact.Component {
	constructor(props) {
		super(props);

		this.getContent = this.getContent.bind(this);

		this.state = {
			content: this.getContent(this.props.headings)
		}
	}

	getContent(nodeList) {
		let content = [];

		if (nodeList) {
			Array.prototype.forEach.call(
				nodeList,
				node => {
					content.push(
						{
							href: node.parentNode.href,
							id: node.parentNode.id,
							title: node.innerText
						}
					);
				}
			);
		}

		return content;
	}

	render({title}, {content}) {
		return !!content.length ? (
			<div>
				<h5 class="toc-heading">{title}</h5>

				<ul class="nav nav-stacked secondary-font">
					{content.map(
						item => {
							return (
								<li key={item.id} class="nav-item">
									<a class="nav-link secondary-text-color" id={`toc-${item.id}`} href={item.href}>
										{item.title}
									</a>
								</li>
							);
						}
					)}
				</ul>
			</div>
		) : (
			''
		);
	}
}

DocTOC.PropTypes = {
	headings: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
};

export default DocTOC;