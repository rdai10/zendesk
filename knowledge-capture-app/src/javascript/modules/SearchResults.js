import React, { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications';
import { Tag } from '@zendeskgarden/react-tags';
import { MD, SM, Span } from '@zendeskgarden/react-typography';
import { useGlobalContext } from '../context/Global';
import I18n from '../lib/i18n';
import { displayDateInMDYFormat } from '../lib/utility';
import ResultsBreadcrumb from './ResultsBreadcrumb';

export default function SearchResults({ categories, results, sections }) {
	return (
		<Grid>
			{results.map((result) => (
				<Result
					categories={categories}
					key={result.id}
					result={result}
					sections={sections}
				/>
			))}
		</Grid>
	);
}

function Result({ categories, sections, result }) {
	const { client } = useGlobalContext();

	const [linked, setLinked] = useState(false);

	const section = getSection(result.section_id);
	const category = getCategory(section ? section.category_id : null);

	function getCategory(id) {
		return categories.find((category) => category.id === id);
	}

	function getSection(id) {
		return sections.find((section) => section.id === id);
	}

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
						<h3>{result.name}</h3>
					</Title>

					<SM>
						{!!category && !!section && (
							<ResultsBreadcrumb
								category={category.name}
								section={section.name}
							/>
						)}

						<Paragraph size="small">
							{I18n.t('last edited')}{' '}
							{displayDateInMDYFormat(result.edited_at)}
						</Paragraph>
					</SM>

					<Row alignItems="center">
						<Col>
							<Button isLink size="small" onClick={handleClick}>
								<Span isBold>{I18n.t('link article')}</Span>
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
