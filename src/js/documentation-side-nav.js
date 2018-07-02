import * as apiHelpers from './api-helpers.js';


apiHelpers.getSectionsCategories()
.then(({data}) => {
	let productDocCategory = data.categories.find(item => item.name === "Product Documentation");

	if (productDocCategory.id) {
		let productDocSections = data.sections.filter(item => item.category_id === productDocCategory.id);
	}
})
.catch(err => {});