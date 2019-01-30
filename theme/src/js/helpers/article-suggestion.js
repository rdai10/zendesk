import {getArticlesBySearch} from '../helpers/api-helpers';

const ARTICLES_PER_SUGGESTION = 5;

function generateResults(results) {
	return results
		.map(
			result =>
				`<li>
					<a href=${result.html_url}>${result.title}</a>
				</li>`
		)
		.join('');
}

export function displayArticleSuggestion(
	queryString,
	productLabel,
	locale,
	label,
	callback
) {
	getArticlesBySearch(
		queryString,
		ARTICLES_PER_SUGGESTION,
		1,
		productLabel,
		locale
	)
		.then(
			({data}) => {
				const results = data.results;

				let html = '';

				if (results.length) {
					html = `
						<div class="custom-suggestion-list">
							<label>${label}</label>

							<ul>
								${generateResults(results)}
							</ul>
						</div>`;
				}

				callback(html);
			}
		)
		.catch(
			err => {
				if (process.env.NODE_ENV === 'development') {
					console.log(err);
				}
			}
		);
}