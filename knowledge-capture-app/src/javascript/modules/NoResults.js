import React from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Col, Row } from '@zendeskgarden/react-grid';
import i18n from '../lib/i18n';

export default function NoResults({ clickHandler }) {
	function handleOnClick() {
		if (clickHandler) {
			clickHandler(true);
		}
	}

	return (
		<NoResultsMsg>
			{i18n.t('no search results available')}
			<Button isLink onClick={handleOnClick}>
				{i18n.t('create new knowledge')}
			</Button>
		</NoResultsMsg>
	);
}

const Wrapper = ({ className, children }) => (
	<Row className={className}>
		<Col textAlign="center">{children}</Col>
	</Row>
);

const NoResultsMsg = styled(Wrapper)`
	position: fixed;
	top: 50%;
`;
