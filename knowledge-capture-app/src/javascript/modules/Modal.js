import React from 'react';
import styled from 'styled-components';
import { Anchor } from '@zendeskgarden/react-buttons';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import i18n from '../lib/i18n';
import { LinkButton } from './LinkArticle';

export default function Modal({ data }) {
	console.log(data);

	return <StyledModalContent data={data} />;
}

const ModalContent = ({ className, data }) => {
	function handleLinkButton() {
		console.log('link btn');
	}

	return (
		<Grid className={className}>
			<article>
				<div dangerouslySetInnerHTML={{ __html: data.body }} />
			</article>

			<footer>
				<Row alignItems="center">
					<Col>
						<Anchor isExternal href={data.html_url}>
							{i18n.t('open in help center')}
						</Anchor>
					</Col>

					<Col textAlign="end">
						<LinkButton handler={handleLinkButton} />
					</Col>
				</Row>
			</footer>
		</Grid>
	);
};

const StyledModalContent = styled(ModalContent)`
	display: flex;
	flex-direction: column;
	height: 100vh;

	article {
		border-bottom: 1px solid ${(p) => p.theme.palette.grey[300]};
		margin-bottom: ${(p) => p.theme.space.xs};
		overflow-y: auto;
	}

	footer {
		padding: ${(p) => p.theme.space.xs};
	}
`;
