import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import {Provider} from 'react-redux'

import App from './components/app/app';
import ErrorBoundary from './components/error-boundary/';

import store from './store';

ReactDOM.render(
    <Provider store = {store}>
        <ErrorBoundary>
            <Router>
               <App/> 
            </Router>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
