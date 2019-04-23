import preact from 'preact';
import PropTypes from 'prop-types';

import {Card} from 'liferay-help-center-megamenu';

const ActionItem = ({config}) => {
	const {disclaimer, iconId, link, message, name} = config;

	return (
		<div class="action-item row">
			<div class="col-md-4 name">
				{iconId && (
					<svg class="lexicon-icon lexicon-icon-ticket icon" role="img">
						<use xlinkHref={iconId} />
					</svg>
				)}

				<a class="link semibold" href={link}>
					{name}
				</a>
			</div>

			{(disclaimer || message) && (
				<div class="col-md-7 message">
					{message && (
						<div class="secondary-text secondary-text-color">
							{message}
						</div>
					)}

					{disclaimer && (
						<div class="disclaimer small">
							<svg className="lexicon-icon lexicon-icon-info-circle">
								<use xlinkHref="#info" />
							</svg>
							{' '}
							{disclaimer}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

ActionItem.propTypes = {
	config: PropTypes.shape(
		{
			disclaimer: PropTypes.string,
			iconId: PropTypes.string,
			link: PropTypes.string.isRequired,
			message: PropTypes.string,
			name: PropTypes.string.isRequired
		}
	)
};

const CallToAction = (
	{
		actionItems,
		className,
		promotions,
		sectionHeading
	}
) => (
	<div className={className}>
		{sectionHeading && (
			<h2 class="col-md-12">
				{sectionHeading}
			</h2>
		)}

		{actionItems && (
			<div class="col-md-7">
				{actionItems.map(
					actionItem => <ActionItem config={actionItem} />
				)}
			</div>
		)}

		{promotions && (
			<div class="col-md-5">
				{promotions.map(
					promotion => (
						<Card
							description={promotion.description}
							name={promotion.name}
							type="product"
							url={promotion.url}
						/>
					)
				)}
			</div>
		)}
	</div>
);

CallToAction.propTypes = {
	actionItems: PropTypes.arrayOf(
		PropTypes.shape(
			{
				disclaimer: PropTypes.string,
				iconId: PropTypes.string,
				link: PropTypes.string.isRequired,
				message: PropTypes.string,
				name: PropTypes.string.isRequired
			}
		)
	).isRequired,
	className: PropTypes.string,
	promotions: PropTypes.arrayOf(
		PropTypes.shape(
			{
				description: PropTypes.string,
				name: PropTypes.string.isRequired,
				url: PropTypes.string.isRequired
			}
		)
	),
	sectionHeading: PropTypes.string
};

export default CallToAction;