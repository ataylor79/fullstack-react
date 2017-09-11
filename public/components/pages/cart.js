import React from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteFromCart, updateCart } from '../../actions/cartActions';

class Cart extends React.Component{

	constructor() {
		super();
		this.state = {
			showModal: false
		};
	}

	modalOpen() { 
		this.setState({ showModal: true });
	}

	modalClose() { 
		this.setState({ showModal: false });
	}
	
	handleDelete(_id) {
		this.props.deleteFromCart({ _id });
	}

	handleIncrement(_id) {
		this.props.updateCart(_id, 1, this.props.cart);
	}

	handleDecrement(item) {
		if (item.qty > 1) this.props.updateCart(item._id, -1, this.props.cart);
	}

	renderEmpty() {
		return (<div></div>)
	}

	renderCart() {
		const cartItemList = this.props.cart.map(cartItem => (
			<Panel key={cartItem._id}>
				<Row>
					<Col xs={12} sm={4}>
						<h6>{cartItem.title}</h6><span>    </span>
					</Col>
					<Col xs={12} sm={2}>
						<h6>£ {cartItem.price}</h6>
					</Col>
					<Col xs={12} sm={2}>
						<h6>qty. <Label bsStyle='success'>{cartItem.qty}</Label></h6>
					</Col>
					<Col xs={6} sm={4}>
						<ButtonGroup style={{minW_idth: '300px'}}>
							<Button onClick={this.handleDecrement.bind(this, cartItem)} bsStyle='default' bsSize='small'>-</Button>
							<Button onClick={this.handleIncrement.bind(this, cartItem._id)} bsStyle='default' bsSize='small'>+</Button>
							<span>     </span>
							<Button onClick={this.handleDelete.bind(this, cartItem._id)} bsStyle='danger' bsSize='small'>Delete</Button>
						</ButtonGroup>
					</Col>
				</Row>
			</Panel>
		), this); //note the this for the map function to get component scope

		return (
			<Panel header='Cart' bsStyle='primary'>
				{cartItemList}
				<Row>
					<Col xs={12}>
						<h6>Total amount: {this.props.totalAmount}</h6>
						<Button onClick={this.modalOpen.bind(this)} bsStyle='success' bsSize='small'>
							PROCEED TO CHECKOUT
						</Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.modalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          	<h6>Your order has been saved.</h6>
          	<p>You will receive an order confirmation</p>
          </Modal.Body>
          <Modal.Footer>
          	<Col xs={6}>
          		<h6>Total: £{this.props.totalAmount}</h6>
          	</Col>
            <Button onClick={this.modalClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
			</Panel>
		)
	}
	
	render() {
		return (this.props.cart[0]) ? this.renderCart() : this.renderEmpty();
	}
};

const mapStateToProps = state => ({ 
	cart: state.cart.cart, 
	totalAmount: state.cart.totalAmount,
	totalQuantity: state.cart.totalQuantity 
});
const mapDispatchToProps = dispatch => bindActionCreators({ deleteFromCart, updateCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);