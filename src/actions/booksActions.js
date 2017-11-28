import * as actionTypes from './actionTypes';
import axios from 'axios';

// refactor these calls to reduce repeated code

export const getBooks = () => {
	return dispatch => {
		axios.get('/api/books')
			.then(resp => dispatch({ type: actionTypes.GET_BOOKS_SUCCESS, payload: resp.data }))
			.catch(err => dispatch({ type: actionTypes.GET_BOOKS_FAILED, payload: 'There was an error getting books.' }))
	}
};

// post book with array of book objects
export const postBooks = books => {
	return dispatch => {
		axios.post('/api/books', books)
		.then(resp => dispatch({ type: actionTypes.POST_BOOK_SUCCESS, payload: resp.data }))
		.catch(err => dispatch({ type: actionTypes.POST_BOOK_FAILED, payload: 'There was an error trying to post a new book.'}))
	}
};

// delete book with _id object
export const deleteBook = _id => {
	return dispatch => {
		axios.delete('/api/books/' + _id)
			.then(resp => dispatch({ type: actionTypes.DELETE_BOOK_SUCCESS, payload: _id }))
			.catch(err => dispatch({ type: actionTypes.DELETE_BOOK_FAILED, payload: 'There was an error trying to delete a book.'}))

	}
};

// update book with object
export const updateBook = book => ({
	type: actionTypes.UPDATE_BOOK, 
	payload:book
});

// update book with object
export const resetButton = () => ({
	type: actionTypes.RESET_BUTTON,
});