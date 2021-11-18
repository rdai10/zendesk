domLoaded(function() {
	// Checks to see if user is on New Request page or My Requests page

	if (
		location.pathname.indexOf('/requests/new') > -1 ||
		location.pathname.match(/\/requests$/)
	) {
		getDevOrgs();
	}

	// Checks to see if user is on a specific Request page

	if (location.pathname.match(/\/requests\/\d+/)) {
		getRequestOrg();
	}
});

function getDefaultOrgId(orgName, allOrgs) {
	let defaultOrgId = null;

	for (const org in allOrgs) {
		if (allOrgs[org] === orgName) {
			defaultOrgId = org;
			return;
		}
	}

	return defaultOrgId;
}

// filter user tags to obtain IDs of the org with the _watcher suffix

function getUserWatcherTags(userTags) {
	return userTags
		.filter(tag => tag.match(/osb_(\d*)_watcher/))
		.map(tag => tag.split('_')[1]);
}

function removeWatcherOrgs(allOrgs, watcherOrgs) {
	return allOrgs.filter(org => watcherOrgs.indexOf(org) === -1);
}

// obtain dev orgs for current user
function getDevOrgs() {
	const orgs = {};
	const orgOptions = document.querySelectorAll(
		'#request_organization_id option'
	);

	if (orgOptions.length) {
		orgOptions.forEach(option => (orgs[option.value] = option.text));

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
				console.error(error);
			});
	} else {
		showWatcherMessage();
	}
}

function assignOrgs(orgs) {
	const allOrgIds = Object.keys(orgs);
	const watcherOrgIds = getUserWatcherTags(HelpCenter.user.tags);
	const allowedOrgIds = removeWatcherOrgs(allOrgIds, watcherOrgIds);

	const orgField = document.querySelector(
		'.request_organization_id a.nesty-input'
	);
	const orgOptions = document.querySelectorAll(
		'#request_organization_id option'
	);

	if (orgField) {
		const firstAllowedOrgId = allowedOrgIds[0];
		const firstAllowedOrgName = orgs[firstAllowedOrgId];

		const defaultOrgId = getDefaultOrgId(orgField.text, allOrgIds);

		if (firstAllowedOrgId) {
			// if the default org is a watched org, select the next allowed org to be displayed
			if (!allowedOrgIds.includes(defaultOrgId)) {
				orgField.innerText = firstAllowedOrgName;

				orgOptions.forEach(option => {
					if (option.value === firstAllowedOrgId) {
						option.setAttribute('selected', true);
					} else {
						option.setAttribute('selected', false);
					}
				});
			}

			showForm();
		} else {
			showWatcherMessage();
		}

		orgField.onclick = () => {
			orgOptions.forEach(option => {
				const optionId = option.value;

				if (watcherOrgIds.includes(optionId)) {
					document
						.getElementById(optionId)
						?.setAttribute('style', 'display: none;');
				}
			});
		};
	}
}

function showWatcherMessage() {
	const form = document.querySelector('.request-form-wrapper');
	const watcherMsg = document.querySelector('.watcher-message');

	form?.remove();
	watcherMsg?.classList.remove('d-none');
}

function showForm() {
	const form = document.querySelector('.request-form-wrapper');
	const watcherMsg = document.querySelector('.watcher-message');

	form?.classList.remove('d-none');
	watcherMsg?.remove();
}

// get org of current request
function getRequestOrg() {
	const requestId = location.pathname.match(/\/requests\/(\d+)/)[1];
	const watcherOrgs = getUserWatcherTags(HelpCenter.user.tags);

	$.ajax('/api/v2/requests/' + requestId)
		.done(function(data) {
			if (data.request) {
				const requestOrgId = data.request.organization_id;

				customizeRequestPage(requestOrgId, watcherOrgs);
			}
		})
		.fail(function(error) {
			console.error(error);
		});
}

// on request page, remove comment box if necessary
function customizeRequestPage(id, watcherOrgs) {
	const requestComment = document.querySelector(
		'.request-container .comment-form'
	);

	if (watcherOrgs.indexOf(String(id)) > -1) {
		requestComment.remove();
	} else {
		requestComment.css('display', 'flex');
	}
}
