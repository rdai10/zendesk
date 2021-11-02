const INITIAL_BANNER_HEIGHT = 414;
const INITIAL_MAIN_CONTENT_OFFSET = 56;

export default function showSiteWideNotification() {
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
				(INITIAL_BANNER_HEIGHT + notificationHeight) +
				'px; padding-top: ' +
				notificationHeight +
				'px;';

			banner.setAttribute('style', newBannerStyle);
		}

		const mainContent = document.querySelector('.main-content');

		if (mainContent) {
			const newContentStyle =
				'margin-top: ' +
				(INITIAL_MAIN_CONTENT_OFFSET + notificationHeight) +
				'px;';

			mainContent.setAttribute('style', newContentStyle);
		}

		const megaMenu = document.querySelectorAll('.header-menu');
		const newMegaMenuStyle =
			'top: ' +
			(INITIAL_MAIN_CONTENT_OFFSET + notificationHeight) +
			'px;';

		// IE 11 compatible
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
						'min-height: ' + INITIAL_BANNER_HEIGHT + 'px;'
					);
				}

				if (mainContent) {
					mainContent.setAttribute(
						'style',
						'margin-top: ' + INITIAL_MAIN_CONTENT_OFFSET + 'px;'
					);
				}

				Array.prototype.forEach.call(megaMenu, function(menu) {
					menu.setAttribute(
						'style',
						'top: ' + INITIAL_MAIN_CONTENT_OFFSET + 'px;'
					);
				});

				sessionStorage.setItem('showSiteWideNotification', 'false');
			});
		}
	}
}
