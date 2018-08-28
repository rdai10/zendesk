import preact from 'preact';
import PropTypes from 'prop-types';

import Card from './Card';

const CardMenu = ({className, configs, type}) => (
	<div class={className}>
		{configs.map(
			config => (
				<Card
					description={config.description}
					name={config.name}
					svgId={config.svgId}
					type={type}
					url={config.url}
				/>
			)
		)}
	</div>
);

CardMenu.defaultProps = {
	type: "product"
}

CardMenu.propTypes = {
	className: PropTypes.string,
	configs: PropTypes.object,
	type: PropTypes.oneOf(['nav', 'product'])
};

export default CardMenu;