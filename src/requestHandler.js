'use strict';

import axios from 'axios';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import reducers from './reducers';
import routes from './routes'

const handleRender = (req, res, next) => {
	axios.get('http://localhost:3001/books')
		.then(resp => {

			// 1. Create a redux store
			const store = createStore(reducers, { "books": { "books": resp.data }});
			// 2. Get initial state from storez
			const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
			// 3. Implement react-router server side
			const Routes = { routes, location: req.url }; 
			match(Routes, (err, redirect, props) => {
				if (err) { res.status(500).send('Could not fulfill request')}
				else if (redirect) { res.status(302, redirect.pathname + redirect.search) }
				else if (props) {
					const reactComponent = renderToString(
						<Provider store={store}>
							<RouterContext {...props} />
						</Provider>
					);

					res.status(200).render('index', { reactComponent, initialState});
				} else {
					res.status(404).send('NOt found!');
				}
			});

		})
		.catch(err => {
			console.log('#initial server-side error', err)
		});
}

module.exports = handleRender;