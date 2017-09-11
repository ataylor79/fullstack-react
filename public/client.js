import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/';
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBook, updateBook } from './actions/booksActions';
import BookList from './components/pages/bookList';
import BookForm from './components/pages/bookForm';
import Cart from './components/pages/cart';
import Main from './main';


// create store with middleware
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Main}>
				<IndexRoute component={BookList} />
				<Route path='/admin' component={BookForm} />
				<Route path='/cart' component={Cart} />
			</Route>
		</Router>
	</Provider>
);


render( 
	Routes, document.getElementById('app')
);
