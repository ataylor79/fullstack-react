import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/cartdb', {useMongoClient: true})

// BOOKS API
import Books from './models/books';

app.post('/books', (req, res) => {
	const book = req.body;

	Books.create(book, (err, books) => {
		if(err) { throw err; }

		res.json(books);
	})
});

app.get('/books', (req, res) => {
	Books.find((err, books) => {
		if(err) { throw err; }

		res.json(books);
	})
});

app.put('/books/:_id', (req, res) => {
	const book = req.body;
	const query = { _id: req.params._id };
	const update = { '$set': { ...book }};
	const options = { new: true };

	Books.findOneAndUpdate(query, update, options, (err, books) => {
		if(err) { throw err; }

		res.json(books);
	})
})

app.delete('/books/:_id', (req, res) => {
	const query = {_id: req.params._id };

	console.log('query', query)

	Books.remove(query, (err, books) => {
		if(err) { throw err; }

		res.json(books);
	})
})

// CART API
// cart.get
// cart.post
// cart.delete
// cart.put

// END APIs

app.listen(3001, err => {
	if (err) {
		return console.log(err);
	}

	console.log('API server is listening on http://localhost:3001')
})

module.exports = app;
