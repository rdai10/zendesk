import preact from 'preact';

import NavCard from './NavCard.js';

const CardMenu = ({className, configs}) => (
	<div class={className}>
		{configs.map(config => 
			<NavCard
				description={config.description}
				svgId={config.svgId}
				name={config.name}
				url={config.url}
			/>
		)}
	</div>
);

export default ({accountLinks, cardMenuItems, highlightedLinks, name}) => (
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
					/>
				</div>
			</div>

			<div class="col-3 submenu">
				<CardMenu 
					className={highlightedLinks.className} 
					configs={highlightedLinks.configs} 
				/>

				<CardMenu 
					className={accountLinks.className}
					configs={accountLinks.configs} 
				/>
			</div>
		</div>
	</div>
);