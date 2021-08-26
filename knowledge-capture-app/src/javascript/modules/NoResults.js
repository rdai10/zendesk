import React from 'react';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import i18n from '../lib/i18n';

export default function NoResults() {
	return (
		<Grid>
			<Row>
				<Col textAlign="center">
					{i18n.t('no search results available')}
				</Col>
			</Row>
		</Grid>
	);
}
