//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const app = express();
require('pretty-error').start();


//CONFIG URI
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/blue';
const gunny = process.env.GUNNY || 'gunny';

//CONNECT TO MONGO
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message, 'is Mongod not running?'));
db.on('connected', () => console.log('Mongo connected on:', mongoURI));
db.on('disconnected', () => console.log('Mongo Disconnected'));
mongoose.Promise = global.Promise;


//REQUIRE CONTROLLERS
const sessionController = require('./controllers/sessionController.js');
const userController = require('./controllers/userController.js');
// const dailyController = require('./controllers/dailyController.js');

// MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: gunny,
  resave: false,
  saveUninitialized: false
}));
app.use('/users', userController);
app.use('/sessions', sessionController);
// app.use('/blue', dailyController);

app.get('/:whatever', (req, res) => res.redirect('/'))
app.get('/:whatever/:whatever', (req, res) => res.redirect('/'))

app.listen(PORT, () => console.log('Blue app running on port', PORT));
