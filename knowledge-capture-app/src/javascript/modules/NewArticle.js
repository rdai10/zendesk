import React from 'react';
import styled from 'styled-components';
import { Anchor, Button } from '@zendeskgarden/react-buttons';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import i18n from '../lib/i18n';
import { BASE_URL, DXPC_FAST_TRACK_ID, FAST_TRACK_ID } from '../lib/constants';

export default function NewArticle({
	brandId,
	clickHandler,
	locale,
	ticketId,
}) {
	return (
		<Grid>
			<PageHeading clickHandler={clickHandler} />

			<ArticleTemplates
				brandId={brandId}
				locale={locale}
				ticketId={ticketId}
			/>
		</Grid>
	);
}

const Body = ({ brandId, className, locale, ticketId }) => {
	const generateArticleURL = (templateId) =>
		`${BASE_URL}/knowledge/articles/new/${locale}?template_id=${templateId}&brand_id=${brandId}&ticket_id=${ticketId}`;

	return (
		<Row className={className}>
			<Col>
				{i18n.t('choose a template')}

				<ul>
					<Template
						title={i18n.t('dxpc fast track article')}
						url={generateArticleURL(DXPC_FAST_TRACK_ID)}
					/>

					<Template
						title={i18n.t('fast track article')}
						url={generateArticleURL(FAST_TRACK_ID)}
					/>
				</ul>
			</Col>
		</Row>
	);
};

const CloseButton = ({ className, clickHandler }) => {
	function handleClick() {
		if (clickHandler) {
			clickHandler(false);
		}
	}

	return (
		<Button className={className} isBasic onClick={handleClick}>
			X
		</Button>
	);
};

const Heading = ({ className, clickHandler }) => (
	<Row alignItems="center">
		<Col size="10">
			<h3 className={className}>{i18n.t('create knowledge')}</h3>
		</Col>

		<Col size="2">
			<StyledCloseButton clickHandler={clickHandler} />
		</Col>
	</Row>
);

const Template = ({ title, url }) => (
	<li>
		<Anchor href={url} target="_blank">
			{title}
		</Anchor>
	</li>
);

const ArticleTemplates = styled(Body)`
	padding: ${(p) => p.theme.space.md} 0;

	ul {
		li {
			padding: ${(p) => p.theme.space.sm} 0px;
			word-wrap: break-word;

			~ li {
				border-top: 1px solid ${(p) => p.theme.palette.grey[300]};
			}
		}
	}
`;

const PageHeading = styled(Heading)`
	font-size: ${(p) => p.theme.fontSizes.lg};
	font-weight: ${(p) => p.theme.fontWeights.semibold};
	line-height: ${(p) => p.theme.lineHeights.xl};
`;

const StyledCloseButton = styled(CloseButton)`
	color: ${(p) => p.theme.palette.grey[800]};
	font-weight: ${(p) => p.theme.fontWeights.semibold};
`;
