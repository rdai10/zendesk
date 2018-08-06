import preact from 'preact';

import NavCard from './NavCard.js';

const CardMenu = ({className, configs}) => (
	<div className={className}>
		{configs.map(
			config => (
				<NavCard
					description={config.description}
					name={config.name}
					svgId={config.svgId}
					url={config.url}
				/>
			)
		)}
	</div>
);

class Submenu extends preact.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			selectLanguage: false
		};
	}

	handleClick() {
		this.setState(
			{
				selectLanguage: !this.state.selectLanguage
			}
		);
	}

	render({accountLinks, highlightedLinks, locale}, {selectLanguage}) {
		return selectLanguage ? (
			<div className="col-3 language-selection submenu">
				<svg className="icon" onClick={this.handleClick}>
					<use xlinkHref="#arrow-left" />
				</svg>

				<div className="available-languages">
					<a
						className="current"
						href={locale.currentLocale.url}
						rel="nofollow"
					>
						{locale.currentLocale.name}
					</a>

					{locale.alternativeLocales.map(
						alternativeLocale => (
							<a href={alternativeLocale.url} rel="nofollow">
								{alternativeLocale.name}
							</a>
						)
					)}
				</div>
			</div>
		) : (
			<div className="col-3 submenu">
				<CardMenu
					className={highlightedLinks.className}
					configs={highlightedLinks.configs}
				/>

				<CardMenu
					className={accountLinks.className}
					configs={accountLinks.configs}
				/>

				<div className="language">
					<NavCard
						name={locale.currentLocale.name}
						svgId="#language"
						onClick={this.handleClick}
						url="javascript:;"
					/>
				</div>
			</div>
		);
	}
}

export default (
	{
		accountLinks,
		cardMenuItems,
		highlightedLinks,
		locale,
		name
	}
) => (
	<div className="container-fluid container-fluid-max-xl">
		<div className="header-menu-content row">
			<div className="col-9 menu-body">
				<h6 className="secondary-text-color">
					{name}
				</h6>

				<div className="card-menu-container">
					<CardMenu
						className={cardMenuItems.className}
						configs={cardMenuItems.configs}
					/>
				</div>
			</div>

			<Submenu
				accountLinks={accountLinks}
				highlightedLinks={highlightedLinks}
				locale={locale}
			/>
		</div>
	</div>
);