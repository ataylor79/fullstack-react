import Mongoose from 'mongoose';

const booksSchema = Mongoose.Schema({
	title: String,
	description: String,
	images: String,
	price:Number
});

const Books = Mongoose.model('Books', booksSchema);

export default Books; 
