import * as actionTypes from '../actions/actionTypes';

const reducers = (state={ books: []}, action) => {

	let books;

	switch(action.type) {
		case actionTypes.GET_BOOKS_SUCCESS:
			return { ...state, books: [...action.payload] };
			break;

		case actionTypes.POST_BOOK_SUCCESS:

			books = [
				...state,
				...state.books,
				...action.payload,
			];
			return { books,
					msg: 'Saved! Click to continue',
					style: 'success',
					validation: 'success'
			};
			break;

		case actionTypes.POST_BOOK_FAILED:
			return { ...state,
				msg: 'Please try again',
				style: 'danger',
				validation: 'error'
			};
			break;

		case actionTypes.DELETE_BOOK_SUCCESS:
			// create a copy
			const currentBooksToDelete = [...state.books];
			// find index of book to delete
			const indexToDelete = currentBooksToDelete.findIndex(book => book._id === action.payload._id);
			books = [
				...currentBooksToDelete.slice(0, indexToDelete),
				...currentBooksToDelete.slice(indexToDelete + 1)
			];

			// return sliced array of books, remove the deleted object
			return { books };
			break;

		case actionTypes.RESET_BUTTON:

			return { ...state,
				msg: null,
				style: 'primary',
				validation: null
			};
			break;

		case actionTypes.UPDATE_BOOK:
			// create a copy
			const currentBooksToUpdate = [...state.books];
			// find index of book to delete
			const indexToUpdate = currentBooksToUpdate.findIndex(book => book._id === action.payload._id);
			const updatedBook = {...currentBooksToUpdate[indexToUpdate], ...action.payload};

			// return sliced array of books, remove the deleted object
			books = [
				...currentBooksToUpdate.slice(0, indexToUpdate),
				updatedBook,
				...currentBooksToUpdate.slice(indexToUpdate + 1)
			];

			return { books };
			break;
	}

	return state;
};

export default reducers;