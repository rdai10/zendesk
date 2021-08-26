import React, { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications';
import { Tag } from '@zendeskgarden/react-tags';
import { Ellipsis, MD, SM } from '@zendeskgarden/react-typography';
import { useGlobalContext } from '../context/Global';
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
	const { client } = useGlobalContext();

	const [linked, setLinked] = useState(false);

	function handleClick() {
		client.invoke(
			'ticket.editor.insert',
			`<a href=${result.html_url} rel="noopener noreferrer" target="_blank" >${result.name}</a>`
		);

		setLinked(true);
	}

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

					<Row alignItems="center">
						<Col>
							<Button isLink size="small" onClick={handleClick}>
								{I18n.t('link article')}
							</Button>
						</Col>

						{linked && (
							<Col textAlign="end">
								<Tag hue="blue">
									<span>{I18n.t('linked')}</span>
								</Tag>
							</Col>
						)}
					</Row>
				</Well>
			</Col>
		</Row>
	);
}
