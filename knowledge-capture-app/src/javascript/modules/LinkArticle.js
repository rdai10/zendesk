import React from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Col, Row } from '@zendeskgarden/react-grid';
import { Tag } from '@zendeskgarden/react-tags';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { Span } from '@zendeskgarden/react-typography';

import I18n from '../lib/i18n';

const LinkButton = ({ className, handler }) => (
	<Button className={className} isLink size="small" onClick={handler}>
		<Span isBold>{I18n.t('link article')}</Span>
	</Button>
);

const StyledLinkButton = styled(LinkButton)`
	font-size: ${DEFAULT_THEME.fontSizes.sm};
	margin-top: ${DEFAULT_THEME.space.xs};
`;

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
