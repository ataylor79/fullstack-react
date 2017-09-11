import React from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends React.Component{
	handleCart() {
		const book = [...this.props.cart, {
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			price: this.props.price,
			qty: 1
		}];

		if (this.props.cart.length > 0) {
			const _id = this.props._id;
			const cart = [...this.props.cart];

			const IndexOfitemToIncrement = cart.findIndex(item => item._id === _id);

			if (IndexOfitemToIncrement === -1) {
				this.props.addToCart(book)
			} else {
				this.props.updateCart(_id, 1, this.props.cart);
			}
				

		} else {
			this.props.addToCart(book);
		}

	}
	render() {
		return (
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{ this.props.title }</h6>
						<p>{ this.props.description }</p>
						<h6>£{ this.props.price }</h6>
						<Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
					</Col>
				</Row>
			</Well>
		)
	}
}

const mapStateToProps = state => ({ cart: state.cart.cart });
const mapDispatchToProps = dispatch => bindActionCreators({ addToCart, updateCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);