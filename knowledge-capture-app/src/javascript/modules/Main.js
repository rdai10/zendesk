import React from 'react';

import ErrorBoundary from './ErrorBoundary';

export default function Main(data) {
	console.log(data);
	return <ErrorBoundary>Hello World</ErrorBoundary>;
}
