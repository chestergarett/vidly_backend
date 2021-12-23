
require('express-async-errors');
const winston = require('winston');
const config = require('config');
require('winston-mongodb');

module.exports = function(){
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, { 
        db: config.get('db'),
        level: 'error'
    });

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

    process.on('unhandledRejection', (ex)=> {
        throw ex;
    });
};

