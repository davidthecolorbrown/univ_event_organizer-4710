// note api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import Note database model
const Note = require('../models/notes');

// API endpoint - GET list of all notes (or only list of notes from query)
//http://localhost:3001/api/note
router.get('/note', function(req, res) {
    console.log("ME MOTHERFUCKER ME");
    console.log(req.query);
    console.log(req.query.start_date);
    console.log(req.query.end_date);

    Note.find({}).then(function(notes) {
        //console.log(notes);
        res.send(notes);
    });
});

// API endpoint - GET notes within a given date range
//http://localhost:3001/api/note/date_range?date1=str1&date2=str2
router.get('/note/date_range', function(req, res) {
    console.log(req.query);
    console.log(req.query.start_date);
    console.log(req.query.end_date);

    //res.send('');
    Note.find({}).then(function(notes) {
        console.log(notes);
        console.log('here we go');
        Note.find({ date: { $gte: req.query.start_date, $lte: req.query.end_date } }).then(function(dates) {
        // //Note.find({ airedAt: { $gte: '1987-10-19', $lte: '1987-10-26' } }).then(function(notes) {
        // //Note.find({}).then(function(notes) {
        //     //return Episode.find({ date: { $gte: '1987-10-19', $lte: '1987-10-26' } }).sort({ airedAt: 1 });
        //     //console.log(notes);
            res.send(dates);
        });
    });
});



// API endpoint - GET a note by _id
router.get('/note/:id', function(req, res) {
    console.log("REQ.PARAMS.ID: " + req.params.id);
    
    // find user document by id and update with request body
    //Note.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
    
    // check if this works by finding User's unique _id and checking for update
    Note.findOne({ _id: req.params.id }).then(function(note) {
        // send update back to as response
        res.send(note);
    });
    //});
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


// expoert router object with Note endpoint 
module.exports = router;