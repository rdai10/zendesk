import preact from 'preact';
import PropTypes from 'prop-types';

const CallToAction = ({iconId, link, message, name, sectionHeading}) => (
	<div>
		{sectionHeading && <h2>{sectionHeading}</h2>}

		{iconId && (
			<svg class="lexicon-icon lexicon-icon-ticket icon">
				<use xlinkHref={iconId} />
			</svg>
		)}

		<a class="link" href={link}>
			{name}
		</a>

		{message && (
			<span class="message secondary-text secondary-text-color">
				{message}
			</span>
		)}
	</div>
);

CallToAction.propTypes = {
	iconId: PropTypes.string,
	link: PropTypes.string.isRequired,
	message: PropTypes.string,
	name: PropTypes.string.isRequired,
	sectionHeading: PropTypes.string
};

export default CallToAction;
