// note api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import user database model
const User = require('../models/users');
const Event = require('../models/events');
const Comments = require('../models/comments');

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

// API endpoint - get list of all THIS users events
//router.get('/users/:uid/events', verifyToken ,function(req, res) {
router.get('/user/:uid/events', function(req, res) {
    //res.send(req.params.event_id);
    console.log("REQ.PARAMS.UID: " + req.params.uid);

    //
    User.findOne({ uid: req.params.uid }).then(function(user) {
    //Event.findOne({ event_id: req.params.event_id }).then(function(event) {
        // check for errors, respond if occurs
        //if (err) {
            //res.send(err);
            //return;
        //};

        // print name of first budget to console
        //console.log(event.user_budgets[0].budget_name);

        // respond with array of user_budgets
        res.send(user.events);
        console.log(user.events);

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

// API endpoint - GET a user by uid
router.get('/user/:uid', function(req, res) {
    console.log("REQ.PARAMS.uID: " + req.params.uid);
    
    // check if this works by finding User's unique _id and checking for update
    User.findOne({ uid: req.params.uid }).then(function(user) {
        // send update back to as response
        res.send(user);
    });
});

// API endpoint - check if user exists (return true)
router.get('/user/:login/:pw', function(req, res) {
    console.log("REQ.PARAMS.login: " + req.params.login);
    console.log("REQ.PARAMS.pw: " + req.params.pw);

    //check if this works by finding User's unique _id and checking for update
    //User.findOne({ pw: req.params.pw }).then(function(user) {
    User.findOne({email: email, pwd: pwd}).then(function(user) {
        //send update back to as response
        res.send(user.uid);
    });
});

// API endpoint - GET a user by pw
//router.get('/user/:pw', function(req, res) {
    //console.log("REQ.PARAMS.pw: " + req.params.pw);
    
    // check if this works by finding User's unique _id and checking for update
    //User.findOne({ pw: req.params.pw }).then(function(user) {
        // send update back to as response
        //res.send(user);
    //});
//});

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