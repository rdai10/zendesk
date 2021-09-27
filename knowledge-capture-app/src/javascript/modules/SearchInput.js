import React, {useState} from 'react';
import styled from 'styled-components';
import {Button} from '@zendeskgarden/react-buttons';
import {Field, Input, InputGroup, Label} from '@zendeskgarden/react-forms';
import {Col, Row} from '@zendeskgarden/react-grid';
import {Tooltip} from '@zendeskgarden/react-tooltips';
import {XL} from '@zendeskgarden/react-typography';
import PlusIcon from '@zendeskgarden/svg-icons/src/16/plus-stroke.svg';
import SearchIcon from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg';

import i18n from '../lib/i18n';

export default function SearchInput({clickHandler, updateKeyword, value}) {
	const [currentValue, setCurrentValue] = useState(value);

	function handleOnChange(event) {
		setCurrentValue(event.currentTarget.value);
	}

	function handleOnClick(event) {
		const {currentTarget} = event;
		const inputValue = currentTarget.previousSibling.value;

		if (inputValue !== '') {
			setCurrentValue('');
		}
	}

	function handleOnKeyDown(event) {
		if (event.keyCode === 13 && updateKeyword) {
			updateKeyword(currentValue);
		}
	}

	return (
		<Row justifyContent="center">
			<Col size="10">
				<Field>
					<Label hidden>{i18n.t('search input')}</Label>

					<InputGroup>
						<AdjustedInput
							onChange={handleOnChange}
							onKeyDown={handleOnKeyDown}
							value={currentValue}
						/>
						<Button focusInset isNeutral onClick={handleOnClick}>
							{currentValue === '' ? <SearchIcon /> : <XIcon />}
						</Button>
					</InputGroup>
				</Field>
			</Col>

			<Col size="2">
				<AddArticleButton clickHandler={clickHandler} />
			</Col>
		</Row>
	);
}

const AddButton = ({className, clickHandler}) => {
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
				className={className}
				onClick={handleOnClick}
			>
				<XL>
					<PlusIcon />
				</XL>
			</Button>
		</Tooltip>
	);
};

const AddArticleButton = styled(AddButton)`
	padding: 0;
	width: ${(p) => p.theme.space.xl};
`;

/* On linux Mozilla Firefox, the input height is calculated by the browser to be > 40px, causing the input group to be misaligned between the input and the button. Reducing the padding, coupled with the component style min-height: 40px, ensures that parts of the input group will always be aligned.
*/
const AdjustedInput = styled(Input)`
	padding-bottom: 9px;
	padding-top: 9px;
`;
