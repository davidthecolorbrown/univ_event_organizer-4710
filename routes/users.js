// note api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import user database model
const User = require('../models/users');

// API endpoint - GET list of all users (or only list of users from query)
//http://localhost:3001/api/user
router.get('/user', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    User.find({}).then(function(users) {
        //console.log(users);
        res.send(users);
    });
});

// API endpoint - GET users within a given date range
//http://localhost:3001/api/user/date_range?date1=str1&date2=str2
router.get('/user/date_range', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    User.find({}).then(function(users) {
        //console.log(users);
        User.find({ date: { $gte: req.query.start_date, $lte: req.query.end_date } }).then(function(dates) {
            res.send(dates);
        });
    });
});

// API endpoint - GET a user by _id
router.get('/user/:id', function(req, res) {
    console.log("REQ.PARAMS.ID: " + req.params.id);
    
    // check if this works by finding User's unique _id and checking for update
    User.findOne({ _id: req.params.id }).then(function(user) {
        // send update back to as response
        res.send(user);
    });
});

// API endpoint - post new user
router.post('/user', function(req, res, next) {
    console.log(req.body)
    User.create(req.body).then(function(user) {
        res.send(user);
    }).catch(next);
});

// API endpoint - update a user
router.put('/user/:id', function(req, res) {
    console.log(req);
    
    // find user document by id and update with request body
    User.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
        // check if this works by finding User's unique _id and checking for update
        User.findOne({ _id: req.params.id }).then(function(user) {
            console.log(user);
            // send update back to as response
            res.send(user);
            
        });
    });
});

// API endpoint - delete a user
router.delete('/user/:id', function(req, res) {
    // find user document by id, delete
    User.findByIdAndRemove({ _id: req.params.id }, req.body).then(function(user) {
        // send update back to as response
        res.send(user);
    });
})

// expoert router object with Note endpoint 
module.exports = router;