import preact from 'preact';
import PropTypes from 'prop-types';

import * as throttle from 'lodash.throttle';

const HEADING_OFFSET = 72;

class DocTOC extends preact.Component {
	constructor(props) {
		super(props);

		this.calculateActiveId = this.calculateActiveId.bind(this);
		this.handleOnScroll = this.handleOnScroll.bind(this);
		this.throttleEvent = this.throttleEvent.bind(this);

		this.state = {
			activeId: '',
			sticky: false
		}
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

		content.some(
			(item, index) => {
				if (
					currentPosition !== item.top &&
					currentPosition < (item.top - HEADING_OFFSET)
				) {
					activeIndex = index - 1;

					return true;
				}
			}
		);

		return activeIndex > -1 ? content[activeIndex].id : '';
	}

	handleOnScroll() {
		const scrollPosition = Math.floor(window.scrollY);

		if (scrollPosition !== 0) {
			this.setState(
				{
					activeId: this.calculateActiveId(scrollPosition),
					sticky: true
				}
			);
		} else {
			this.setState(
				{
					activeId: '',
					sticky: false
				}
			);
		}
	}

	throttleEvent(...args) {
		this.throttled = throttle(...args);

		return this.throttled;
	}

	render({content, title}, {activeId, sticky}) {
		return (
			<div class={`${sticky ? 'fixed' : ''} toc-body`}>
				<h5 class="toc-heading">{title}</h5>

				<ul class="nav nav-stacked secondary-font">
					{content.map(
						item => {
							return (
								<li key={item.id} class="nav-item">
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
						}
					)}
				</ul>
			</div>
		)
	}
}

DocTOC.PropTypes = {
	headings: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
};

export default DocTOC;