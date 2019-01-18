import preact from 'preact';
import PropTypes from 'prop-types';

const Alert = ({children, leadingText}) => (
	<div class="alert alert-info" role="alert">
		<span class="alert-indicator">
			<svg className="lexicon-icon lexicon-icon-info-circle">
				<use xlinkHref="#info-circle" />
			</svg>
		</span>

		{leadingText && (
			<strong class="lead">
				{leadingText}
			</strong>
		)}
		{children}
	</div>
);

Alert.propTypes = {
	children: PropTypes.node.isRequired,
	leadingText: PropTypes.string
};

export default Alert;