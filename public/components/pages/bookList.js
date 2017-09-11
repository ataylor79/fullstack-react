import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';

class Booklist extends React.Component{
	componentDidMount() {
		this.props.getBooks();
	}
	render() {
		const bookList = this.props.books.map(book => (
			<Col xs={12} sm={6} md={4} key={ book._id }>
				<BookItem 
					_id={ book._id }
					title={ book.title }
					description={ book.description }
					price={ book.price }
				/>
			</Col>
		));

		return (
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row style={{ marginTop: '15px'}}>
					<Col xs={12} sm={6}>
						<BookForm />
					</Col>
					{bookList}
				</Row>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({ books: state.books.books });
const mapDispatchToProps = dispatch => bindActionCreators({ getBooks }, dispatch);

// connect to store
export default connect(mapStateToProps, mapDispatchToProps)(Booklist);