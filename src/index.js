import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import ErrorBoundary from './components/error-boundary/error-boundary';

ReactDOM.render(
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>,
    document.getElementById('root')
);
