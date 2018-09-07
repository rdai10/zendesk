$(document).ready(
	function() {
		if (location.pathname.indexOf('/requests/new') > -1) {
			getDevOrgs();

			var allowedOrgsByName = HelpCenter.user.allowedOrgsByName;
			var allowedUserOrgs = HelpCenter.user.allowedOrgs;

			var form = $('div.watcher-message').next('div');

			var key = Object.keys(allowedUserOrgs)[0];
			var value = Object.values(allowedUserOrgs)[0];

			if (value) {
				if (!allowedOrgsByName[$('.request_organization_id a.nesty-input').text()]) {
					$('.request_organization_id a.nesty-input').text(value);

					$('#request_organization_id option').each(
						function(option) {
							if ($(this).val() == key) {
								$(this).attr('selected', true);
							}
							else {
								$(this).attr('selected', false);
							}
						}
					);
				}

				$('.watcher-message').remove();

				$(form).removeClass('d-none');
			}
			else {
				$(form).remove();

				$('.watcher-message').removeClass('d-none');
			}

			$('.request_organization_id a.nesty-input').on(
				'click',
				function() {
					$('#request_organization_id option').each(
						function(option) {
							var id = $(this).val();

							if (!allowedUserOrgs[id]) {
								$('#' + id).remove();
							}
						}
					);
				}
			);
		}
		else if (location.pathname.match(/\/requests\/\d+/)) {
			getRequestOrg();
		}
	}
);

Array.prototype.subtract = function(arr) {
	return this.filter(
		function(el) {
			return arr.indexOf(el) === -1;
		}
	);
};

// filter user tags to obtain IDs of tags with the osb_[id]_watcher suffix

function getUserWatcherTags(userTags) {
	if (!userTags.includes('osb_partner')) {
		return userTags.filter(
			function(tag) {
				return tag.match(/osb_(\d*)_watcher/);
			}
		)
		.map(
			function(tag) {
				return tag.split('_')[1];
			}
		);
	} else {
		return [];
	}
}

// obtain dev orgs for current user

function getDevOrgs() {
	if (!HelpCenter.user.allowedOrgs) {
		var orgs = {};

		$('#request_organization_id option').each(
			function(option) {
				orgs[$(this).val()] = $(this).text();
			}
		);

		var allOrgs = Object.keys(orgs);

		var userTags = window.HelpCenter.user.tags;

		var watcherOrgs = getUserWatcherTags(userTags);

		var allowedOrgs = allOrgs.subtract(watcherOrgs);

		var allowedUserOrgs = {};

		allowedOrgs.forEach(
			function(id) {
				if (orgs[id]) {
					allowedUserOrgs[id] = orgs[id];
				}
			}
		);

		HelpCenter.user['allowedOrgs'] = allowedUserOrgs;
		HelpCenter.user['allowedOrgsByName'] = {};

		Object.keys(allowedUserOrgs).forEach(
			function(key) {
				HelpCenter.user['allowedOrgsByName'][allowedUserOrgs[key]] = key;
			}
		);
	}
}

// remove comment box in request page

function disableComments() {
	$('.comment-form').remove();
}

// get org of current request

function getRequestOrg() {
	var id = location.pathname.match(/\/requests\/(\d+)/)[1];

	$.ajax('/api/v2/requests/' + id)
	.done(
		function(data) {
			if (data.request) {
				var requestOrgId = data.request.organization_id;

				customizeRequestPage(requestOrgId);
			}
		}
	)
	.fail(
		function(error) {
			console.log(error);
		}
	);
}

// on request page, disable org drop-down and remove comment box if necessary

function customizeRequestPage(id) {
	$('#request_organization_id').attr('disabled', true);

	var userTags = window.HelpCenter.user.tags;

	var watcherOrgs = getUserWatcherTags(userTags);

	if (watcherOrgs.indexOf(String(id)) > -1) {
		disableComments();
	}
	else {
		$('.request-container .comment-form').css('display', 'flex');
	}
}