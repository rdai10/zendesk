import React, { useState } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Input, InputGroup, Label } from '@zendeskgarden/react-forms';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
// import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
// import { ReactComponent as XIcon } from '@zendeskgarden/svg-icons/src/16/x-stroke.svg';

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

						<InputGroup>
							<Input
								onChange={handleOnChange}
								onKeyDown={handleOnKeyDown}
								value={currentValue}
							/>
							<Button focusInset isNeutral>
								{/* {currentValue === '' ? (
									<SearchIcon />
								) : (
									<XIcon />
								)} */}
							</Button>
						</InputGroup>
					</Field>
				</Col>
			</Row>
		</Grid>
	);
}
