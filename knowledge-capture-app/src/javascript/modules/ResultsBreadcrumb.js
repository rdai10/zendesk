import React from 'react';
import { Breadcrumb } from '@zendeskgarden/react-breadcrumbs';
import { Span } from '@zendeskgarden/react-typography';

export default function ResultsBreadcrumb({ category, section }) {
	return (
		<Breadcrumb>
			<Span>{category}</Span>
			<Span>{section}</Span>
		</Breadcrumb>
	);
}
