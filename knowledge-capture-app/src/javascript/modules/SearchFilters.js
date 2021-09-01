import React, { useState } from 'react';
import styled from 'styled-components';
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

export default function SearchFilters({ resultsDisplayed, updateLanguage }) {
	const languages = [
		{ label: i18n.t('english'), value: 'en-us' },
		{ label: i18n.t('spanish'), value: 'es' },
		{ label: i18n.t('japanese'), value: 'ja' },
		{ label: i18n.t('portuguese'), value: 'pt' },
		{ label: i18n.t('chinese'), value: 'zh-cn' },
	];

	const [selectedItem, setSelectedItem] = useState(languages[0]);

	function handleSelect(val) {
		const currentValue = languages.find((lang) => lang.value === val);

		setSelectedItem(currentValue);

		updateLanguage(val);
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
					<LanguageFilter
						handler={handleSelect}
						languages={languages}
						selectedItem={selectedItem}
					/>
				</Col>
			</Row>
		</Grid>
	);
}

const LanguageDropDown = ({ className, handler, languages, selectedItem }) => (
	<Dropdown
		downshiftProps={{
			itemToString: (language) => language && language.label,
		}}
		onSelect={handler}
		selectedItem={selectedItem}
	>
		<Field>
			<Label hidden>{i18n.t('language selector')}</Label>
			<Select className={className} isCompact>
				{selectedItem.label}
			</Select>
		</Field>
		<Menu>
			{languages.map(({ label, value }) => (
				<Item key={value} value={value}>
					{label}
				</Item>
			))}
		</Menu>
	</Dropdown>
);

const LanguageFilter = styled(LanguageDropDown)`
	border-width: 0;
`;
