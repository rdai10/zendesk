import React from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import i18n from '../lib/i18n';

export default function NewArticle({ clickHandler }) {
	return (
		<Grid>
			<PageHeading clickHandler={clickHandler} />

			<ArticleTemplates />
		</Grid>
	);
}

const Body = ({ className }) => (
	<Row className={className}>
		<Col>{i18n.t('choose a template')}</Col>
	</Row>
);

const ArticleTemplates = styled(Body)`
	padding: ${(p) => p.theme.space.md} 0;
`;

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

const StyledCloseButton = styled(CloseButton)`
	color: ${(p) => p.theme.palette.grey[800]};
	font-weight: ${(p) => p.theme.fontWeights.semibold};
`;

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

const PageHeading = styled(Heading)`
	font-size: ${(p) => p.theme.fontSizes.lg};
	font-weight: ${(p) => p.theme.fontWeights.semibold};
	line-height: ${(p) => p.theme.lineHeights.xl};
`;
