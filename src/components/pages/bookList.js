import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';

class Booklist extends React.Component{
	componentDidMount() {
		this.props.getBooks();
	}
	render() {
		const bookList = this.props.books.map(book => (
			<Col xs={12} sm={6} md={6} key={ book._id }>
				<BookItem 
					_id={ book._id }
					title={ book.title }
					description={ book.description }
					image={ book.image }
					price={ book.price }
				/>
			</Col>
		));

		return (
			<Grid>
				<Row>
					<Carousel>
						<Carousel.Item>
							<img width={900} height={300} alt="900x300" src="/public/images/home1.jpg"/>
							<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img width={900} height={300} alt="900x300" src="/public/images/home2.jpg"/>
							<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</Row>
				<Row>
					<Cart />
				</Row>
				<Row style={{ marginTop: '15px'}}>
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