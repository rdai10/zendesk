#!/bin/bash
set -eou pipefail

shopt -s globstar nullglob

function add_product_page_tempate {
	pushd src/resources/templates/category_pages/ >/dev/null
	 
	# Zendesk currently only allows for a max of 10 templates
	count=$(find . -type f | wc -l)

	if [ "$count" == 10 ]; then
		local portal_products=(liferay_portal*)
		mv "${portal_products[0]}" liferay_"$1".hbs
	else
		local dxp_products=(liferay_dxp*)
		cp "${dxp_products[0]}" liferay_"$1".hbs
	fi

	popd >/dev/null
}

function main {
	add_product_page_tempate "$1"
}

main "${@}"