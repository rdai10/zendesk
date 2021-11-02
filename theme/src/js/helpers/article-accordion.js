$(function() {
	const articlePanels = document.querySelectorAll('.article-body .panel');

	// IE 11 compatible
	Array.prototype.forEach.call(articlePanels, panel => {
		panel.addEventListener('click', event => {
			if (!event.target.classList.contains('panel-body')) {
				event.currentTarget.classList.toggle('show');
			}
		});
	});
});
