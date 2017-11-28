import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../src/reducers/';
import { addToCart } from '../src/actions/cartActions';
import { postBooks, deleteBook, updateBook } from '../src/actions/booksActions';

import routes from '../src/routes';

// create store with middleware
const middleware = applyMiddleware(thunk, logger);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

const Routes = (
	<Provider store={store}>
		{ routes }
	</Provider>
);


render( 
	Routes, document.getElementById('app')
);
