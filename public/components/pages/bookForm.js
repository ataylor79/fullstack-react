import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks, deleteBook } from '../../actions/booksActions';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
 
class BooksForm extends React.Component{
	handleForm() {
		
		const book = [Object.keys(this.refs).reduce((formData, ref) => ({ 
			...formData, 
			[ref]: findDOMNode(this.refs[ref]).value 
		}), {})];

		this.props.postBooks(book);
	}

	onDelete() {
		const _id = findDOMNode(this.refs.delete).value
		this.props.deleteBook(_id);
	}

	render() {

		const bookList = this.props.books.map(book => (
			<option key={book._id} value={book._id}>{book.title}</option>
		));

		return(
			<Well>
				<Panel>
					<FormGroup controlId='title'>
						<ControlLabel>Title</ControlLabel>
						<FormControl 
							type='text'
							placeholder='Enter Title'
							ref='title'/>
					</FormGroup>
					<FormGroup controlId='description'>
						<ControlLabel>Description</ControlLabel>
						<FormControl 
							type='text'
							placeholder='Enter Description'
							ref='description'/>
					</FormGroup>
					<FormGroup controlId='price'>
						<ControlLabel>Price</ControlLabel>
						<FormControl 
							type='text'
							placeholder='Enter Price'
							ref='price'/>
					</FormGroup>
					<Button onClick={this.handleForm.bind(this)} type='submit' bsStyle='primary'>Save Book</Button>
				</Panel>
				<Panel style={{marginTop: '25px'}}>
					<FormGroup controlId="formControlsSelect">
			      <ControlLabel>Select a book to delete</ControlLabel>
			      <FormControl ref='delete' componentClass="select" placeholder="select">
			        <option value="select">select</option>
			        {bookList}
			      </FormControl>
			    </FormGroup>
			    <Button onClick={this.onDelete.bind(this)} bsStyle='danger'>Delete Book</Button>
				</Panel>
			</Well>
		)
	}
}

const mapStateToProps = state => ({ books: state.books.books });
const mapDispatchToProps = dispatch => bindActionCreators({ postBooks, deleteBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);