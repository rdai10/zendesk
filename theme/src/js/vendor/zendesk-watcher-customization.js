$(document).ready(function() {
	if (
		location.pathname.indexOf('/requests/new') > -1 ||
		location.pathname.match(/\/requests$/)
	) {
		getDevOrgs();
	} else if (location.pathname.match(/\/requests\/\d+/)) {
		getRequestOrg();
	}
});

Array.prototype.subtract = function(arr) {
	return this.filter(function(el) {
		return arr.indexOf(el) === -1;
	});
};

// filter user tags to obtain IDs of tags with the _watcher suffix
function getUserWatcherTags(userTags) {
	return userTags
		.filter(function(tag) {
			return tag.match(/osb_(\d*)_watcher/);
		})
		.map(function(tag) {
			return tag.split('_')[1];
		});
}

// obtain dev orgs for current user
function getDevOrgs() {
	var orgs = {};
	var orgOptions = $('#request_organization_id option');

	if ($(orgOptions).length > 0) {
		$(orgOptions).each(function(option) {
			orgs[$(this).val()] = $(this).text();
		});

		assignOrgs(orgs);
	} else if (HelpCenter.user.organizations.length > 0) {
		$.ajax('/api/v2/users/me')
			.done(function(data) {
				if (data.user) {
					orgs[data.user.organization_id] =
						HelpCenter.user.organizations[0].name;
				}

				assignOrgs(orgs);
			})
			.fail(function(error) {
				console.log(error);
			});
	} else {
		showWatcherMessage();
	}
}

function assignOrgs(orgs) {
	var allOrgs = Object.keys(orgs);
	var userTags = HelpCenter.user.tags;
	var watcherOrgs = getUserWatcherTags(userTags);
	var allowedOrgs = allOrgs.subtract(watcherOrgs);

	var allowedOrgsById = {};
	var allowedOrgsByName = {};

	allowedOrgs.forEach(function(id) {
		allowedOrgsById[id] = orgs[id];
		allowedOrgsByName[orgs[id]] = id;
	});

	var key = Object.keys(allowedOrgsByName)[0];
	var value = Object.values(allowedOrgsByName)[0];

	if (value) {
		// if the default org is a watched org, select the next dev to be default
		if (
			!allowedOrgsByName[
				$('.request_organization_id a.nesty-input').text()
			]
		) {
			$('.request_organization_id a.nesty-input').text(key);
			$('#request_organization_id option').each(function(option) {
				if ($(this).val() === key) {
					$(this).attr('selected', true);
				} else {
					$(this).attr('selected', false);
				}
			});
		}
		showForm();
	} else {
		showWatcherMessage();
	}

	$('.request_organization_id a.nesty-input').on('click', function() {
		var option = this;

		$('#request_organization_id option').each(function(option) {
			var id = $(this).val();
			if (!allowedOrgsById[id]) {
				$('#' + id).remove();
			}
		});
	});
}

function showWatcherMessage() {
	$('.watcher-message')
		.next('div')
		.remove();

	$('.watcher-message').removeClass('d-none');
}

function showForm() {
	$('.watcher-message')
		.next('div')
		.removeClass('d-none');

	$('.watcher-message').remove();
}

// get org of current request
function getRequestOrg() {
	var id = location.pathname.match(/\/requests\/(\d+)/)[1];

	$.ajax('/api/v2/requests/' + id)
		.done(function(data) {
			if (data.request) {
				var requestOrgId = data.request.organization_id;

				customizeRequestPage(requestOrgId);
			}
		})
		.fail(function(error) {
			console.log(error);
		});
}

// on request page, disable org drop-down and remove comment box if necessary
function customizeRequestPage(id) {
	$('#request_organization_id').attr('disabled', true);
	var userTags = HelpCenter.user.tags;
	var watcherOrgs = getUserWatcherTags(userTags);

	if (watcherOrgs.indexOf(String(id)) > -1) {
		$('.comment-form').remove();
	} else {
		$('.request-container .comment-form').css('display', 'flex');
	}
}