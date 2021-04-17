// api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import event database model
const Event = require('../models/events');
//const User = require('../models/users');
const Comments = require('../models/comments');

// API endpoint - GET list of all events (or only list of events from query)
//http://localhost:3001/api/event
router.get('/event', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    Event.find({}).then(function(events) {
        //console.log(events);
        res.send(events);
    });
});

// API endpoint - GET events within a given date range
//http://localhost:3001/api/event/date_range?date1=str1&date2=str2
router.get('/event/date_range', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    Event.find({}).then(function(events) {
        //console.log(events);
        Event.find({ date: { $gte: req.query.start_date, $lte: req.query.end_date } }).then(function(dates) {
            res.send(dates);
        });
    });
});

// API endpoint - GET a event by _id
router.get('/event/:id', function(req, res) {
    console.log("REQ.PARAMS.ID: " + req.params.id);
    
    // check if this works by finding User's unique _id and checking for update
    Event.findOne({ _id: req.params.id }).then(function(event) {
        // send update back to as response
        res.send(event);
    });
});

// API endpoint - get list of all THIS events comments
router.get('/event/:event_id/comments', function(req, res) {
    //res.send(req.params.event_id);
    //console.log("REQ.PARAMS.event_ID: " + req.params.event_id);

    Event.findOne({ event_id: req.params.event_id }).then(function(event) {
        // check for errors, respond if occurs
        //if (err) {
            //res.send(err);
            //return;
        //};

        // print name of first budget to console
        //console.log(event.user_budgets[0].budget_name);

        // respond with array of user_budgets
        res.send(event.comments);
        console.log(event.comments);

    });
});

// API endpoint - post new event
router.post('/event', function(req, res, next) {
    console.log(req.body)
    Event.create(req.body).then(function(event) {
        res.send(event);
    }).catch(next);
});

// API endpoint - post new comment
router.post('/event/:event_id/comments', function(req, res, next) {
//router.post('/event/:event_id/:uid/comments', function(req, res, next) {
//router.post('/event/:event_id/comments', verifyToken,function(req, res, next) {

    //
    console.log(req.body)

    // create new comment schema from json obj sent in post request body
    const newComment = new Comment(req.body);

    //
    //Event.findById(req.params.id, function(err, user) {
    Event.findOne({ event_id: req.params.event_id }).then(function(event) {
        // check for errors, respond if occurs
        //if (err) {
            //res.send(err);
        //};

        // add new budget to new user's budget array
        event.comments.push(newComment);
        res.json(event);

    });

});


// API endpoint - update a event
router.put('/event/:id', function(req, res) {
    console.log(req);
    
    // find user document by id and update with request body
    Event.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
        // check if this works by finding User's unique _id and checking for update
        Event.findOne({ _id: req.params.id }).then(function(event) {
            console.log(event);
            // send update back to as response
            res.send(event);
            
        });
    });
});

// API endpoint - delete a event
router.delete('/event/:id', function(req, res) {
    // find user document by id, delete
    Event.findByIdAndRemove({ _id: req.params.id }, req.body).then(function(event) {
        // send update back to as response
        res.send(event);
    });
})

// expoert router object with Note endpoint 
module.exports = router;