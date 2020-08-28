#!/bin/bash
set -eou pipefail

shopt -s globstar nullglob

function add_product_page_tempate {
	pushd src/resources/templates/category_pages/ >/dev/null
		declare -a portal_products

		for name in liferay_portal*
		do
			portal_products+=("$name")
		done

		declare -a dxp_products

		for name in liferay_dxp*
		do
			dxp_products+=("$name")
		done

		count=$(find . -type f | wc -l)

		# Zendesk currently only allows for a max of 10 templates

		if [ "$count" == 10 ]; then
			mv "${portal_products[0]}" liferay_"$1".hbs
		else
			cp "${dxp_products[0]}" liferay_"$1".hbs
		fi
	popd >/dev/null
}

function main {
	add_product_page_tempate "$1"
}

main "${@}"