import preact from 'preact';

export default ({description, name, onClick, svgId, url}) => (
	<a
		className="autofit-row autofit-row-center nav-card"
		href={url}
		onClick={onClick}
	>
		{svgId && (
			<div className="autofit-col">
				<svg className="icon">
					<use xlinkHref={svgId} />
				</svg>
			</div>
		)}

		<div className="autofit-col autofit-col-expand">
			{name && <h4 className="title">{name}</h4>}
			{description && <p className="description">{description}</p>}
		</div>
	</a>
);