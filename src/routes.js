import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import BookList from './components/pages/bookList';
import BookForm from './components/pages/bookForm';
import Cart from './components/pages/cart';
import Main from './main';


const routes = (
		<Router history={browserHistory}>
			<Route path='/' component={Main}>
				<IndexRoute component={BookList} />
				<Route path='/admin' component={BookForm} />
				<Route path='/cart' component={Cart} />
			</Route>
		</Router>
);

export default routes;
