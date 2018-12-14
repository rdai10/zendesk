$(function() {
	const articlePanels = document.querySelectorAll(
		'.article-body .panel'
	);

	articlePanels.forEach(
		panel => {
			panel.addEventListener(
				'click', 
				(event) => {
					if (!event.target.classList.contains('panel-body')) {
						event.currentTarget.classList.toggle('show');
					}
				}
			);
		}
	);
});