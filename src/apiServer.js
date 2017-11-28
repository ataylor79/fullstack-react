import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import fs from 'fs';

const MongoStore = connectMongo(session);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/cartdb', {useMongoClient: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '))

app.use(session({
	secret: 'aSecretString',
	saveUnitialized: false,
	resave: true,
	cookie: {maxAge: 1000* 60 * 60 * 24 * 2},
	store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

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
});


app.delete('/books/:_id', (req, res) => {
	const query = {_id: req.params._id };

	Books.remove(query, (err, books) => {
		if(err) { throw err; }

		res.json(books);
	})
});


// cart.get
app.get('/cart', (req, res) => {
	if (typeof req.session.cart !== 'undefined') { 
		res.json(req.session.cart)
	}
});
// cart.post
app.post('/cart', (req, res) => {
	const cart = req.body;

	req.session.cart = cart;
	req.session.save((err) => {
		if (err) { throw err; }

		res.json(req.session.cart);
	})
});

// Get images api
app.get('/images', (req, res) => {
	const imgFolder = __dirname + '/public/images';

	fs.readdir(imgFolder, (err, files) => {
		if (err) console.error(err);

		const filesArr = [];
		files.forEach(name => filesArr.push({ name }) );
		res.json(filesArr);
	})
});


// END APIs

app.listen(3001, err => {
	if (err) {
		return console.log(err);
	}

	console.log('API server is listening on http://localhost:3001')
})

module.exports = app;
