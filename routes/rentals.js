const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

Fawn.init('mongodb://127.0.0.1:27017/vidly');

//endpoints
router.get('/', async(req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async(req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie out of stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    //two-way transactions
    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, { 
            $inc: { numberInStock: -1 },
        })
        .run();    
    }
    catch(ex) {
        res.status(500).send('Something went wrong.');
    }
    

    res.send(rental);
})

module.exports = router;