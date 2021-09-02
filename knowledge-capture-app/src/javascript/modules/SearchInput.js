import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Input, InputGroup, Label } from '@zendeskgarden/react-forms';
import { Col, Row } from '@zendeskgarden/react-grid';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { XL } from '@zendeskgarden/react-typography';
// import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
// import { ReactComponent as XIcon } from '@zendeskgarden/svg-icons/src/16/x-stroke.svg';

import i18n from '../lib/i18n';

const AddButton = ({ clickHandler }) => {
	function handleOnClick() {
		if (clickHandler) {
			clickHandler(true);
		}
	}

	return (
		<Tooltip
			content={i18n.t('create knowledge')}
			placement="start"
			size="small"
		>
			<Button
				aria-label={i18n.t('create knowledge')}
				onClick={handleOnClick}
			>
				<XL>+</XL>
			</Button>
		</Tooltip>
	);
};

export default function SearchInput({ clickHandler, updateKeyword, value }) {
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
		<Row justifyContent="center" wrap="nowrap">
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

			<Col>
				<AddButton clickHandler={clickHandler} />
			</Col>
		</Row>
	);
}
