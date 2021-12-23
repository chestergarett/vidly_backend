const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    //use database
    mongoose.connect('mongodb://localhost/vidly')
    .then( () => winston.info('Connected to MongoDB') )
    // .catch( err => console.error('Could not connect to MongoDB'))
}