import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks, deleteBook, getBooks, resetButton } from '../../actions/booksActions';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import axios from 'axios';
 
class BooksForm extends React.Component{
	constructor() {
		super();
		this.state = {
			images: [{}],
			img: ''
		}
	}

	componentDidMount() {
		this.props.getBooks();
		axios.get('/api/images')
			.then(resp => this.setState({images: resp.data}))
			.catch(err => this.setState({images: 'Error loading images from server'}))
	}
	
	handleForm() {		
		const book = [Object.keys(this.refs).reduce((formData, ref) => ({ 
			...formData, 
			[ref]: findDOMNode(this.refs[ref]).value 
		}), {})];

		this.props.postBooks(book);
	}

	handleSelect(img) {
		this.setState({
			img: '/public/images/' + img
		});
	}

	onDelete() {
		const _id = findDOMNode(this.refs.delete).value
		this.props.deleteBook(_id);
	}

	resetForm() {
		// reset Button
		this.props.resetButton();
		['title', 'description', 'price'].forEach(ref => 
			findDOMNode(this.refs[ref]).value = ''
		);
		this.setState({img:''});
	}

	render() {

		const bookList = this.props.books.map(book => (
			<option key={book._id} value={book._id}>{book.title}</option>
		));

		const imgList = this.state.images.map((img, i) => (
			<MenuItem 
				key={i} 
				eventKey={img.name}
				onClick={this.handleSelect.bind(this, img.name)}>{img.name}</MenuItem>
		));

		return(
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
								<FormControl type="text" ref="image" value={this.state.img} />
								<DropdownButton
								componentClass={InputGroup.Button}
								id="input-dropdown-addon"
								title="Select an image"
								bsStyle='primary'>
									{imgList}
								</DropdownButton>
							</InputGroup>
							<Image src={this.state.img} responsive/>
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup controlId='title' validationState={this.props.validation}>
								<ControlLabel>Title</ControlLabel>
								<FormControl 
									type='text'
									placeholder='Enter Title'
									ref='title'/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId='description' validationState={this.props.validation}>
								<ControlLabel>Description</ControlLabel>
								<FormControl 
									type='text'
									placeholder='Enter Description'
									ref='description'/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId='price' validationState={this.props.validation}>
								<ControlLabel>Price</ControlLabel>
								<FormControl 
									type='text'
									placeholder='Enter Price'
									ref='price'/>
								<FormControl.Feedback />
							</FormGroup>
							<Button 
								onClick={(!this.props.msg) ? this.handleForm.bind(this) : this.resetForm.bind(this)} 
								type='submit' 
								bsStyle={(!this.props.style) ? 'primary' : this.props.style}
								>
								{(!this.props.msg) ? 'Save Book' : this.props.msg}
								</Button>
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
					</Col>
				</Row>				
			</Well>
		)
	}
}

const mapStateToProps = state => ({ 
		books: state.books.books, 
		msg: state.books.msg, 
		style: state.books.style,
		validation: state.books.validation });
const mapDispatchToProps = dispatch => bindActionCreators({ 
		postBooks, 
		deleteBook, 
		getBooks, 
		resetButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);