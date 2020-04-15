export function gateArticle() {
	const additionalInformationNode = document.getElementById(
		'additionalInformation'
	);

	if (additionalInformationNode) {
		additionalInformationNode.parentNode.removeChild(
			additionalInformationNode
		);
	}

	const resolutionNode = document.getElementById('resolution');

	if (resolutionNode) {
		const resolutionChildren = resolutionNode.children;

		for (let i = 0; i < resolutionChildren.length; i++) {
			const child = resolutionChildren.item(i);

			if (child.tagName !== 'H2') {
				child.parentNode.removeChild(child);
			}
		}

		resolutionNode.classList.add('gated');
	}

	const gateSigninPrompt = document.querySelector('.gate-signin-prompt');

	if (gateSigninPrompt) {
		gateSigninPrompt.classList.remove('d-none');
	}
}

export function showArticleAttachments() {
	const articleAttachments = document.querySelector('.article-attachments');

	if (articleAttachments) {
		articleAttachments.classList.remove('d-none');
	}
}

export function showArticleFooter() {
	const articleFooter = document.querySelector('.article-footer');

	if (articleFooter) {
		articleFooter.classList.remove('d-none');
	}
}
