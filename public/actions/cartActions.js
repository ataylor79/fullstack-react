import * as actionTypes from './actionTypes';


export const getCart = () => ({
	type: actionTypes.GET_CART_SUCCESS,
	payload: book
});

export const addToCart = book => ({
	type: actionTypes.ADD_TO_CART_SUCCESS,
	payload: book
});

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

	return {
		type: actionTypes.UPDATE_CART_SUCCESS,
		payload: newCart
	}
	
}

export const deleteFromCart = _id => ({
	type: actionTypes.DELETE_FROM_CART_SUCCESS,
	payload: _id
})