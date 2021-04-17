// note api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import rso database model
const rso = require('../models/rsos');
const Event = require('../models/events');
const Comments = require('../models/comments');
const RSO = require('../models/rsos');


// API endpoint - GET list of all rsos (or only list of rsos from query)
router.get('/rso', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    rso.find({}).then(function(rsos) {
        //console.log(rsos);
        res.send(rsos);
    });
});

// API endpoint - get list of all THIS RSOs events
router.get('/rso/:RSO_id/events', function(req, res) {
    //res.send(req.params.event_id);
    console.log("REQ.PARAMS.RSO_ID: " + req.params.RSO_id);

    //
    RSO.findOne({ RSO_id: req.params.RSO_id }).then(function(rso) {
    //Event.findOne({ event_id: req.params.event_id }).then(function(event) {
        // check for errors, respond if occurs
        //if (err) {
            //res.send(err);
            //return;
        //};

        // respond with array of rso_budgets
        res.send(rso.events);
        console.log(rso.events);

    });
});

// API endpoint - GET a rso by RSO_id
router.get('/rso/:RSO_id', function(req, res) {
    console.log("REQ.PARAMS.RSO_id: " + req.params.RSO_id);
    
    // check if this works by finding rso's unique _id and checking for update
    rso.findOne({ RSO_id: req.params.RSO_id }).then(function(rso) {
        // send update back to as response
        res.send(rso);
    });
});

// API endpoint - post new rso
router.post('/rso', function(req, res, next) {
    console.log(req.body)
    rso.create(req.body).then(function(rso) {
        res.send(rso);
    }).catch(next);
});

// API endpoint - update a rso
router.put('/rso/:RSO_id', function(req, res) {
    console.log(req);
    
    // find rso document by id and update with request body
    RSO.findOneAndUpdate({ RSO_id: req.params.RSO_id }, req.body).then(function() {
        // check if this works by finding rso's unique _id and checking for update
        RSO.findOne({ RSO_id: req.params.RSO_id }).then(function(rso) {
            console.log(rso);
            // send update back to as response
            res.send(rso);
            
        });
    });
});

// API endpoint - delete a rso
router.delete('/rso/:RSO_id', function(req, res) {
    // find rso document by id, delete
    RSO.findByIdAndRemove({ RSO_id: req.params.RSO_id }, req.body).then(function(rso) {
        // send update back to as response
        res.send(rso);
    });
})

// expoert router object with Note endpoint 
module.exports = router;