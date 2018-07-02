/*
 * jQuery v1.9.1 included
 */

$(document).ready(
	function() {
		function search() {
			window.location.search = $.param(
				{
					organization_id: $('#request-organization-select').val(),
					query: $('#quick-search').val(),
					status: $('#request-status-select').val()
				}
			);
		}

		function setExpanded(node) {
			var isExpanded = node.getAttribute('aria-expanded') === 'true';

			node.setAttribute('aria-expanded', !isExpanded);
		}

		var commentContainerFormControls = $('.comment-form-controls, .comment-ccs');
		var commentContainerTextarea = $('.comment-container textarea');

		commentContainerTextarea.one(
			'focus',
			function() {
				commentContainerFormControls.show();
			}
		);

		if (commentContainerTextarea.val() !== '') {
			commentContainerFormControls.show();
		}

		var requestContainer = $('.request-container');

		var commentContainer = requestContainer.find('.comment-container');

		var showRequestCommentContainerTrigger = commentContainer.find('.comment-show-container');

		showRequestCommentContainerTrigger.on(
			'click',
			function() {
				commentContainer.find('.comment-fields').show();
				commentContainer.find('.request-submit-comment').show();

				showRequestCommentContainerTrigger.hide();

				commentContainerTextarea.focus();
			}
		);

		var requestCommentSubmitButton = commentContainer.find('input[type=submit]');

		var requestMarkAsSolvedButton = requestContainer.find('.mark-as-solved:not([data-disabled])');

		requestMarkAsSolvedButton.on(
			'click',
			function () {
				$('.request-container .comment-container input[type=checkbox]').attr('checked', true);

				requestCommentSubmitButton.prop('disabled', true);

				$(this).attr('data-disabled', true).closest('form').submit();
			}
		);

		var requestCommentTextarea = requestContainer.find('.comment-container textarea');

		requestCommentTextarea.on(
			'keyup',
			function() {
				var text = requestMarkAsSolvedButton.data('solve-translation');

				var hasText = requestCommentTextarea.val() !== '';

				if (hasText) {
					text = requestMarkAsSolvedButton.data('solve-and-submit-translation');
				}

				requestCommentSubmitButton.prop('disabled', !hasText);

				requestMarkAsSolvedButton.text(text);
			}
		);

		if (requestCommentTextarea.val() === '') {
			requestCommentSubmitButton.prop('disabled', true);
		}

		$('.collapsible-nav, .collapsible-sidebar').on(
			'click',
			function(event) {
				event.stopPropagation();

				setExpanded(this);
			}
		);

		$('.header .icon-menu').on(
			'click',
			function(event) {
				event.stopPropagation();

				var userNav = document.getElementById('user-nav');

				setExpanded(userNav);
			}
		);

		$('.share a').click(
			function(event) {
				event.preventDefault();

				window.open(this.href, '', 'height=500, width=500');
			}
		);

		$('#quick-search').on(
			'keypress',
			function(event) {
				if (event.which === 13) {
					search();
				}
			}
		);

		$('#request-organization select').on(
			'change',
			function() {
				this.form.submit();
			}
		);

		$('#request-status-select, #request-organization-select').on(
			'change',
			function() {
				search();
			}
		);

		if ($('#user-nav').children().length === 0) {
			$('.header .icon-menu').hide();
		}
	}
);