import React, { useState } from 'react';
import {
	Dropdown,
	Field,
	Menu,
	Item,
	Select,
	Label,
} from '@zendeskgarden/react-dropdowns';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { SM } from '@zendeskgarden/react-typography';

import i18n from '../lib/i18n';

export default function SearchFilters({ resultsDisplayed }) {
	const languages = [
		{ label: i18n.t('english'), value: 'en-US' },
		{ label: i18n.t('spanish'), value: 'es' },
		{ label: i18n.t('japanese'), value: 'ja' },
		{ label: i18n.t('portuguese'), value: 'pt' },
		{ label: i18n.t('chinese'), value: 'zh-CN' },
	];

	const [selectedItem, setSelectedItem] = useState(languages[0]);

	function handleSelect(val) {
		const currentValue = languages.find((lang) => lang.value === val);

		setSelectedItem(currentValue);
		// pass data up
	}

	return (
		<Grid>
			<Row alignItems="center">
				<Col>
					<SM>
						{resultsDisplayed} {i18n.t('results')}
					</SM>
				</Col>
				<Col>
					<SM>
						<Dropdown
							downshiftProps={{ itemToString: () => {} }}
							onSelect={handleSelect}
							selectedItem={selectedItem}
						>
							<Field>
								<Label hidden>
									{i18n.t('language selector')}
								</Label>
								<Select isCompact>{selectedItem.label}</Select>
							</Field>
							<Menu>
								{languages.map(({ label, value }) => (
									<Item key={value} value={value}>
										{label}
									</Item>
								))}
							</Menu>
						</Dropdown>
					</SM>
				</Col>
			</Row>
		</Grid>
	);
}
