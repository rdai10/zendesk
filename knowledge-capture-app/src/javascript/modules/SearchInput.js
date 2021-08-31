import React, { useState } from 'react';
import { Field, Label, MediaInput } from '@zendeskgarden/react-forms';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';

import i18n from '../lib/i18n';

export default function SearchInput({ updateKeyword, value }) {
	const [currentValue, setCurrentValue] = useState(value);

	function handleOnChange(event) {
		setCurrentValue(event.currentTarget.value);
	}

	function handleOnKeyDown(event) {
		if (event.keyCode === 13 && updateKeyword) {
			updateKeyword(currentValue);
		}
	}

	return (
		<Grid>
			<Row>
				<Col>
					<Field>
						<Label hidden>{i18n.t('search input')}</Label>
						<MediaInput
							onChange={handleOnChange}
							onKeyDown={handleOnKeyDown}
							value={currentValue}
						/>
					</Field>
				</Col>
			</Row>
		</Grid>
	);
}
