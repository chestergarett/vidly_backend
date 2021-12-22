require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

// process.on('uncaughtException', (ex)=> {
//     console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

// process.on('unhandledRejection', (ex)=> {
//     console.log('WE GOT AN UNHANDLED REJECTION');
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidly',
    level: 'error'
});

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (ex)=> {
    throw ex;
});

// const p = Promise.reject(new Error('Something failed miserably'));

app.use(express.json());

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


//use routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

//use database
mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log('Connected to MongoDB') )
    .catch( err => console.error('Could not connect to MongoDB'))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));