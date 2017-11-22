import React from 'react';
import ReactDOM from 'react-dom';
import './app/index.css';

import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom'
import store from './store/configureStore';


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={App}>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();