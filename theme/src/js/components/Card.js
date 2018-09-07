import preact from 'preact';
import PropTypes from 'prop-types';

const Card = ({description, name, onClick, svgId, type, url}) => {
	return (
		<div class={`${type}-card`}>
			<a class="autofit-row autofit-row-center" href={url} onClick={onClick}>
				{svgId && (
					<div class="autofit-col">
						<svg class="icon">
							<use xlinkHref={svgId} />
						</svg>
					</div>
				)}

				<div class="autofit-col autofit-col-expand">
					{name && (
						<h4 class="title">
							{name}
							{type === 'product' ? (
								<svg class="lexicon-icon lexicon-icon-arrow-right">
									<use xlinkHref="#arrow-right" />
								</svg>
							) : (
								''
							)}
						</h4>
					)}

					{description && (
						<p class="description">{description}</p>
					)}
				</div>
			</a>
		</div>
	);
};

Card.propTypes = {
	description: PropTypes.string,
	name: PropTypes.node,
	onClick: PropTypes.func,
	svgId: PropTypes.string,
	type: PropTypes.oneOf(['nav', 'product']).isRequired,
	url: PropTypes.string
};

export default Card;