const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

app.use(express.json());
//use routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
//use database
mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log('Connected to MongoDB') )
    .catch( err => console.error('Could not connect to MongoDB'))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));