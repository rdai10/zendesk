import React, { Component } from 'react';
import { Alert, Title } from '@zendeskgarden/react-notifications';

import I18n from '../lib/i18n';

export default class ErrorBoundary extends Component {
	state = {
		error: '',
		hasError: false,
		info: '',
	};

	componentDidCatch(error, info) {
		this.setState({
			error,
			hasError: true,
			info,
		});

		console.error(`Error: ${error}`);
		console.error(`Error Info: ${JSON.stringify(info)}`);
	}

	render() {
		return this.state.hasError ? (
			<Alert type="error">
				<Title>{I18n.t('Error')}</Title>
				{I18n.t('Something went wrong')}
			</Alert>
		) : (
			this.props.children
		);
	}
}
