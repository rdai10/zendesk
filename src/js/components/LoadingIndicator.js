import preact from 'preact';

export default class LoadingIndicator extends preact.Component {
	render() {
		return (
			<span
				aria-hidden="true"
				class="loading-animation loading-animation-sm"
			/>
		);
	}
}
