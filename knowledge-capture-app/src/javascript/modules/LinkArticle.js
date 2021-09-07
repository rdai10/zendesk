import React from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Col, Row } from '@zendeskgarden/react-grid';
import { Tag } from '@zendeskgarden/react-tags';
import { Span } from '@zendeskgarden/react-typography';

import I18n from '../lib/i18n';

export default function LinkArticle({ linked, handler }) {
	return (
		<Row alignItems="center">
			<Col>
				<StyledLinkButton handler={handler} />
			</Col>

			{linked && (
				<Col textAlign="end">
					<Tag hue="blue">
						<span>{I18n.t('linked')}</span>
					</Tag>
				</Col>
			)}
		</Row>
	);
}

const LinkButton = ({ className, handler }) => (
	<Button className={className} isLink size="small" onClick={handler}>
		<Span isBold>{I18n.t('link article')}</Span>
	</Button>
);

const StyledLinkButton = styled(LinkButton)`
	font-size: ${(p) => p.theme.fontSizes.sm};
	margin-top: ${(p) => p.theme.space.xs};
`;
