import preact from 'preact';
import PropTypes from 'prop-types';

import Card from './Card';
import CardMenu from './CardMenu';

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
			<div class="col-3 language-selection submenu">
				<svg class="icon" onClick={this.handleClick}>
					<use xlinkHref="#arrow-left" />
				</svg>

				<div class="available-languages">
					<a
						class="current"
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
			<div class="col-3 submenu">
				<CardMenu
					className={highlightedLinks.className}
					configs={highlightedLinks.configs}
					type="nav"
				/>

				<CardMenu
					className={accountLinks.className}
					configs={accountLinks.configs}
					type="nav"
				/>

				<div class="language">
					<Card
						name={locale.currentLocale.name}
						svgId="#language"
						type="nav"
						onClick={this.handleClick}
						url="javascript:;"
					/>
				</div>
			</div>
		);
	}
}

Submenu.propTypes = {
	accountLinks: PropTypes.object,
	highlightedLinks: PropTypes.object,
	locale: PropTypes.object
};

const MegaMenu = (
	{
		accountLinks,
		cardMenuItems,
		highlightedLinks,
		locale,
		name
	}
) => (
	<div class="container-fluid container-fluid-max-xl">
		<div class="header-menu-content row">
			<div class="col-9 menu-body">
				<h6 class="secondary-text-color">
					{name}
				</h6>

				<div class="card-menu-container">
					<CardMenu
						className={cardMenuItems.className}
						configs={cardMenuItems.configs}
						type="nav"
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

MegaMenu.propTypes = {
	accountLinks: PropTypes.object,
	cardMenuItems: PropTypes.object,
	highlightedLinks: PropTypes.object,
	locale: PropTypes.object,
	name: PropTypes.string
};

export default MegaMenu;