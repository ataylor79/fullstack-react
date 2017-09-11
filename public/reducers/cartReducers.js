import * as actionTypes from '../actions/actionTypes';

const cartReducers = (state={cart:[]}, action) => {

	let cart;

	switch(action.type) {

		case actionTypes.ADD_TO_CART_SUCCESS:
			return { 
				...state,
				cart: action.payload, 
				totalAmount: totals(action.payload).amount,
				totalQuantity: totals(action.payload).quantity,
			};
			break;
			
		case actionTypes.UPDATE_CART_SUCCESS:

			return { 
				...state, 
				cart: action.payload, 
				totalAmount: totals(action.payload).amount,
				totalQuantity: totals(action.payload).quantity,
			};
			break;

		case actionTypes.DELETE_FROM_CART_SUCCESS:
			// copy cart state
			const currentItemsToDelete = [...state.cart];
			// find index of item to delete
			const deletedItemIndex = currentItemsToDelete.findIndex(item => item._id === action.payload._id);
			
			// return state without deleted item
			cart = [
				...currentItemsToDelete.slice(0, deletedItemIndex),
				...currentItemsToDelete.slice(deletedItemIndex + 1)
			];

			return { 
				...state, 
				cart, 
				totalAmount: totals(cart).amount,
				totalQuantity: totals(cart).quantity,
			};
			break;
	}

	return state;

};

export default cartReducers;

export const totals = cart => ({
	amount: cart.map(item => item.price*item.qty)
						.reduce((total, itemAmount) => (total+itemAmount), 0)
						.toFixed(2),
	quantity: cart.map(item => item.qty)
							.reduce((total, itemQty) => (total+itemQty), 0)
})

