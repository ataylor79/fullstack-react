
import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import { connect } from 'react-redux';

class Main extends React.Component{
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

const mapStateToProps = state => ({
	totalQty: state.cart.totalQuantity
});

export default connect(mapStateToProps)(Main);