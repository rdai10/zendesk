import React from 'react';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications';
import { Ellipsis, MD, SM } from '@zendeskgarden/react-typography';

import I18n from '../lib/i18n';
import { displayDateInMDYFormat } from '../lib/utility';

export default function SearchResults({ results }) {
	return (
		<Grid>
			{results.map((result) => (
				<Result key={result.id} result={result} />
			))}
		</Grid>
	);
}

function Result({ result }) {
	return (
		<Row>
			<Col>
				<Well>
					<Title>
						<MD isBold>{result.name}</MD>
					</Title>

					<SM>
						<Ellipsis>
							{/* <Paragraph size="small">breadcrumb</Paragraph> */}
						</Ellipsis>

						<Paragraph size="small">
							{I18n.t('last edited')}{' '}
							{displayDateInMDYFormat(result.edited_at)}
						</Paragraph>
					</SM>
				</Well>
			</Col>
		</Row>
	);
}
