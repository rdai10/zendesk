import preact from 'preact';

export default ({description, name, onClick, svgId, url}) => (
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