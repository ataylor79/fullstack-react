
import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCart } from './actions/cartActions';

class Main extends React.Component{
	componentDidMount() {
		this.props.getCart();
	}
	
	render() {
		return (
			<div>
				<Menu cartItemsNumber={this.props.totalQty}/>
					{this.props.children}
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({ totalQty: state.cart.totalQuantity });
const mapDispatchToProps = dispatch => bindActionCreators({ getCart }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Main);