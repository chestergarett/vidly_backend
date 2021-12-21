const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();

app.use(express.json());

//use routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

//use database
mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log('Connected to MongoDB') )
    .catch( err => console.error('Could not connect to MongoDB'))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));