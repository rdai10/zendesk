import React from 'react';
import styled from 'styled-components';
import { Anchor } from '@zendeskgarden/react-buttons';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import i18n from '../lib/i18n';
import { LinkButton } from './LinkArticle';

export default function Modal({ data }) {
	console.log(data);

	return <StyledModalContent data={data} />;
}

const ModalContent = ({ className, data }) => {
	function handleLinkButton() {
		console.log('link btn');
	}

	return (
		<Grid className={className}>
			<article>
				<h1 dangerouslySetInnerHTML={{ __html: data.title }} />

				<div dangerouslySetInnerHTML={{ __html: data.body }} />
			</article>

			<footer>
				<Row alignItems="center">
					<Col>
						<Anchor isExternal href={data.html_url}>
							{i18n.t('open in help center')}
						</Anchor>
					</Col>

					<Col textAlign="end">
						<LinkButton handler={handleLinkButton} />
					</Col>
				</Row>
			</footer>
		</Grid>
	);
};

const StyledModalContent = styled(ModalContent)`
	display: flex;
	flex-direction: column;
	height: 100vh;

	article {
		border-bottom: 1px solid ${(p) => p.theme.palette.grey[300]};
		flex: 1;
		line-height: ${(p) => p.theme.lineHeights.lg};
		margin-bottom: ${(p) => p.theme.space.xs};
		overflow-y: auto;
		padding: 0 4.375rem;

		h1,
		h2,
		h3,
		h4 {
			margin-bottom: ${(p) => p.theme.space.sm};
		}

		h1 {
			color: ${(p) => p.theme.palette.grey[800]};
			font-size: ${(p) => p.theme.fontSizes.xl};
			font-weight: ${(p) => p.theme.fontWeights.semibold};
			line-height: ${(p) => p.theme.lineHeights.xl};
			padding-bottom: ${(p) => p.theme.space.sm};
		}

		h2 {
			font-size: ${(p) => p.theme.fontSizes.xl};
		}

		h3 {
			font-size: ${(p) => p.theme.fontSizes.lg};
			font-weight: ${(p) => p.theme.fontWeights.semibold};
		}

		h4 {
			font-size: 1.1rem;
		}

		p {
			margin: ${(p) => p.theme.space.sm} 0;
		}

		pre {
			background: ${(p) => p.theme.palette.grey[100]};
			border: 1px solid ${(p) => p.theme.palette.grey[300]};
			border-radius: ${(p) => p.theme.borderRadii.md};
			padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.sm};
			overflow: auto;
			white-space: pre;
		}

		ul {
			list-style-type: disc;
			padding-left: ${(p) => p.theme.space.lg};
		}

		.article-siblings {
			display: flex;
			justify-content: space-between;
			margin: ${(p) => p.theme.space.sm} 0;
		}
	}

	footer {
		padding: ${(p) => p.theme.space.xs};

		a {
			color: ${(p) => p.theme.palette.grey[600]};
			font-size: ${(p) => p.theme.fontSizes.sm};
			font-weight: ${(p) => p.theme.fontWeights.semibold};
		}

		button {
			font-size: ${(p) => p.theme.fontSizes.sm};

			span {
				font-weight: ${(p) => p.theme.fontWeights.regular};
			}
		}
	}
`;
