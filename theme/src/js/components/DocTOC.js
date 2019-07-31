import preact from 'preact';
import PropTypes from 'prop-types';

import * as throttle from 'lodash.throttle';

const OFFSET = 80;

class DocTOC extends preact.Component {
	constructor(props) {
		super(props);

		this.calculateActiveId = this.calculateActiveId.bind(this);
		this.determineStickiness = this.determineStickiness.bind(this);
		this.handleOnScroll = this.handleOnScroll.bind(this);
		this.throttleEvent = this.throttleEvent.bind(this);

		this.state = {
			activeId: '',
			sticky: false
		};
	}

	componentWillMount() {
		window.addEventListener(
			'scroll',
			this.throttleEvent(this.handleOnScroll, 500)
		);
	}

	componentWillUnmount() {
		this.throttled.cancel();
	}

	calculateActiveId(currentPosition) {
		const {content} = this.props;

		let activeIndex = -1;

		content.forEach((item, index) => {
			if (
				currentPosition === item.top ||
				currentPosition > item.top - OFFSET
			) {
				activeIndex = index;
			}
		});

		return activeIndex > -1 ? content[activeIndex].id : '';
	}

	determineStickiness(currentPosition) {
		const {
			initialTargetBoundingRect: {bottom}
		} = this.props;

		const toc = document.querySelector('.toc-body');
		const tocHeight = toc ? toc.getBoundingClientRect().height : 0;

		return currentPosition + tocHeight < bottom ? true : false;
	}

	handleOnScroll() {
		const {
			initialTargetBoundingRect: {top},
			targetNode
		} = this.props;

		const currentTop = targetNode.getBoundingClientRect().top;

		const currentScrollPosition = Math.abs(currentTop - top);

		if (currentTop !== top) {
			this.setState({
				activeId: this.calculateActiveId(currentScrollPosition),
				sticky: this.determineStickiness(currentScrollPosition)
			});
		} else {
			this.setState({
				activeId: '',
				sticky: false
			});
		}
	}

	throttleEvent(...args) {
		this.throttled = throttle(...args);

		return this.throttled;
	}

	render({content, title}, {activeId, sticky}) {
		return (
			!!content.length && (
				<div class={`${sticky ? 'fixed' : ''} toc-body`}>
					<h5 class='toc-heading'>{title}</h5>

					<ul class='nav nav-stacked secondary-font'>
						{content.map(item => {
							return (
								<li key={item.id} class='nav-item'>
									<a
										class={`${
											activeId === item.id ? 'active' : ''
										} nav-link secondary-text-color`}
										id={`toc-${item.id}`}
										href={`#${item.id}`}
									>
										{item.title}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			)
		);
	}
}

DocTOC.PropTypes = {
	content: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			top: PropTypes.number
		})
	).isRequired,
	initialTargetBoundingRect: PropTypes.shape({
		bottom: PropTypes.number,
		height: PropTypes.number,
		left: PropTypes.number,
		right: PropTypes.number,
		top: PropTypes.number,
		width: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number
	}).isRequired,
	targetNode: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
};

export default DocTOC;
