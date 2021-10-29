const initialBannerHeight = 414;
const initialMainContentOffset = 56;

export function showSiteWideNotification() {
	if (sessionStorage.getItem('showSiteWideNotification') === null) {
		sessionStorage.setItem('showSiteWideNotification', 'true');
	}

	if (sessionStorage.getItem('showSiteWideNotification') === 'true') {
		siteWideNotification.classList.remove('d-none');

		// Layout Updates

		const notificationHeight = siteWideNotification.offsetHeight;

		const banner = document.querySelector('.homepage .banner');

		if (banner) {
			const newBannerStyle =
				'min-height: ' +
				(initialBannerHeight + notificationHeight) +
				'px; padding-top: ' +
				notificationHeight +
				'px;';

			banner.setAttribute('style', newBannerStyle);
		}

		const mainContent = document.querySelector('.main-content');

		if (mainContent) {
			const newContentStyle =
				'margin-top: ' +
				(initialMainContentOffset + notificationHeight) +
				'px;';

			mainContent.setAttribute('style', newContentStyle);
		}

		const megaMenu = document.querySelectorAll('.header-menu');
		const newMegaMenuStyle =
			'top: ' + (initialMainContentOffset + notificationHeight) + 'px;';

		Array.prototype.forEach.call(megaMenu, function(menu) {
			menu.setAttribute('style', newMegaMenuStyle);
		});

		// Closing Notification

		const closeNotification = document.getElementById('closeNotification');

		if (closeNotification) {
			closeNotification.addEventListener('click', function(event) {
				siteWideNotification.classList.add('d-none');

				// Layout Updates

				if (banner) {
					banner.setAttribute(
						'style',
						'min-height: ' + initialBannerHeight + 'px;'
					);
				}

				if (mainContent) {
					mainContent.setAttribute(
						'style',
						'margin-top: ' + initialMainContentOffset + 'px;'
					);
				}

				Array.prototype.forEach.call(megaMenu, function(menu) {
					menu.setAttribute(
						'style',
						'top: ' + initialMainContentOffset + 'px;'
					);
				});

				sessionStorage.setItem('showSiteWideNotification', 'false');
			});
		}
	}
}
