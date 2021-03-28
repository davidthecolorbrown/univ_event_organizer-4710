// note api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import Note database model
const Note = require('../models/notes');

// API endpoint - GET list of all notes (or only list of notes from query)
//http://localhost:3001/api/note
router.get('/note', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    Note.find({}).then(function(notes) {
        //console.log(notes);
        res.send(notes);
    });
});

// API endpoint - GET notes within a given date range
//http://localhost:3001/api/note/date_range?date1=str1&date2=str2
router.get('/note/date_range', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    Note.find({}).then(function(notes) {
        //console.log(notes);
        Note.find({ date: { $gte: req.query.start_date, $lte: req.query.end_date } }).then(function(dates) {
            res.send(dates);
        });
    });
});

// API endpoint - GET a note by _id
router.get('/note/:id', function(req, res) {
    console.log("REQ.PARAMS.ID: " + req.params.id);
    
    // check if this works by finding User's unique _id and checking for update
    Note.findOne({ _id: req.params.id }).then(function(note) {
        // send update back to as response
        res.send(note);
    });
});

// API endpoint - post new note
router.post('/note', function(req, res, next) {
    console.log(req.body)
    Note.create(req.body).then(function(note) {
        res.send(note);
    }).catch(next);
});

// API endpoint - update a note
router.put('/note/:id', function(req, res) {
    console.log(req);
    
    // find user document by id and update with request body
    Note.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
        // check if this works by finding User's unique _id and checking for update
        Note.findOne({ _id: req.params.id }).then(function(note) {
            console.log(note);
            // send update back to as response
            res.send(note);
            
        });
    });
});

// API endpoint - delete a note
router.delete('/note/:id', function(req, res) {
    // find user document by id, delete
    Note.findByIdAndRemove({ _id: req.params.id }, req.body).then(function(note) {
        // send update back to as response
        res.send(note);
    });
})


// import event database model
const Event = require('../models/events');

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

// API endpoint - post new event
router.post('/event', function(req, res, next) {
    console.log(req.body)
    Event.create(req.body).then(function(event) {
        res.send(event);
    }).catch(next);
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