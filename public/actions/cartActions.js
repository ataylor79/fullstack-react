import * as actionTypes from './actionTypes';
import axios from 'axios';


export const getCart = () => {
	return dispatch => {
		axios.get('/api/cart')
			.then(resp => dispatch({ type: actionTypes.GET_CART_SUCCESS, payload: resp.data }))
			.catch(err => dispatch({ type: actionTypes.GET_CART_FAILED, payload: 'There was an error getting the cart.' }))
	}
};

export const addToCart = cart => {
	return dispatch => {
		axios.post('/api/cart', cart)
			.then(resp => dispatch({ type: actionTypes.ADD_TO_CART_SUCCESS, payload: resp.data }))
			.catch(err => dispatch({ type: actionTypes.ADD_TO_CART_FAILED, payload: 'There was an error posting to cart.' }))
	}
};

export const updateCart = (_id, unit, cart) => {

	const currentItemsToUpdate = [...cart];
	const updatedItemIndex = currentItemsToUpdate.findIndex(item => item._id === _id);

	const bookToUpdate = {
		...currentItemsToUpdate[updatedItemIndex],
		qty: currentItemsToUpdate[updatedItemIndex].qty + unit
	}

	const newCart = [
		...currentItemsToUpdate.slice(0, updatedItemIndex),
		bookToUpdate,
		...currentItemsToUpdate.slice(updatedItemIndex + 1)
	];

	 return dispatch => {
		axios.post('/api/cart', newCart)
			.then(resp => dispatch({ type: actionTypes.UPDATE_CART_SUCCESS, payload: resp.data }))
			.catch(err => dispatch({ type: actionTypes.UPDATE_CART_FAILED, payload: 'There was an error updating the cart.' }))
	}	
}

export const deleteFromCart = cart => {
	return dispatch => {
		axios.post('/api/cart', cart)
			.then(resp => dispatch({ type: actionTypes.ADD_TO_CART_SUCCESS, payload: resp.data }))
			.catch(err => dispatch({ type: actionTypes.ADD_TO_CART_FAILED, payload: 'There was an error posting to cart.' }))
	}
};