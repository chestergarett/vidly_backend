const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    //use database
    mongoose.connect(config.get('db'))
    .then( () => winston.info('Connected to MongoDB') )
    // .catch( err => console.error('Could not connect to MongoDB'))
}