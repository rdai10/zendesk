import preact from 'preact';
import PropTypes from 'prop-types';

const NavCard = ({description, name, onClick, svgId, url}) => (
	<a
		class="autofit-row autofit-row-center nav-card"
		href={url}
		onClick={onClick}
	>
		{svgId && (
			<div class="autofit-col">
				<svg class="icon">
					<use xlinkHref={svgId} />
				</svg>
			</div>
		)}

		<div class="autofit-col autofit-col-expand">
			{name && <h4 class="title">{name}</h4>}
			{description && <p class="description">{description}</p>}
		</div>
	</a>
);

NavCard.propTypes = {
	description: PropTypes.string,
	name: PropTypes.string,
	onClick: PropTypes.func,
	svgId: PropTypes.string,
	url: PropTypes.string
};

export default NavCard;