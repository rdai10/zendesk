import React from 'react';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';

import i18n from '../lib/i18n';

export default function SearchInput({ placeholder, updateKeyword, updater }) {
	return (
		<Grid>
			<Row>
				<Col>
					<Field>
						<Label hidden>{i18n.t('search input')}</Label>
						<Input placeholder={placeholder} />
					</Field>
				</Col>
			</Row>
		</Grid>
	);
}
