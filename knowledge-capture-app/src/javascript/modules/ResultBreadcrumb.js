import React from 'react';
import styled from 'styled-components';
import { Span } from '@zendeskgarden/react-typography';

export default function ResultBreadcrumb({ category, section }) {
	return <StyledBreadCrumb category={category} section={section} />;
}

const Breadcrumb = ({ category, className, section }) => (
	<ul className={className}>
		<li>
			<Span>{category}</Span>
		</li>
		<li>
			<Span>{section}</Span>
		</li>
	</ul>
);

const StyledBreadCrumb = styled(Breadcrumb)`
	align-items: center;
	color: ${(p) => p.theme.palette.grey[600]};
	display: flex;
	font-size: ${(p) => p.theme.fontSizes.sm};
	margin-top: 6px;

	li {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		+ li::before {
			content: '>';
			margin: 0 ${(p) => p.theme.space.xxs};
		}
	}
`;
