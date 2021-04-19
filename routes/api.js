// api
const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import event database model
const Event = require('../models/events');
const User = require('../models/users');
const Comment = require('../models/comments');
const RSO = require('../models/rsos');

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
router.post('/event/:event_id/comments', function(req, res) {
//router.post('/event/:event_id/comments', function(req, res, next) {
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

        // add new comment to events array, save
        event.comments.push(newComment);
        event.save();

        console.log(event.comments);
        //console.log(event.title);
        //res.json(event);

        // respond with comments array
        res.json(event.comments);

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

// API endpoint - check if user exists, if so returns user
router.get('/user/:login/:pw', function(req, res) {
    console.log("REQ.PARAMS.login: " + req.params.login);
    console.log("REQ.PARAMS.pw: " + req.params.pw);

    //check if this works by finding User's unique _id and checking for update
    //User.findOne({ pw: req.params.pw }).then(function(user) {
    User.findOne({login: req.params.login, pw: req.params.pw}).then(function(user) {
        //send update back to as response
        res.send(user);
    });

});

// API endpoint - check if user login exists, if so returns user
router.get('/reg/unique/:login', function(req, res) {
    //console.log("REQ.PARAMS.login: " + req.params.login);

    //check if this works by finding User's unique _id and checking for update
    //User.findOne({ pw: req.params.pw }).then(function(user) {
    User.findOne({login: req.params.login}).then(function(user) {
        //console.log(user.uid);
        //send update back to as response
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





// API endpoint - GET list of all rsos (or only list of rsos from query)
router.get('/rso', function(req, res) {
    //console.log(req.query);
    //console.log(req.query.start_date);
    //console.log(req.query.end_date);

    RSO.find({}).then(function(rsos) {
        //console.log(rsos);
        res.send(rsos);
    });
});

// API endpoint - get list of all THIS RSOs events
router.get('/rso/:rso_id/events', function(req, res) {
    //res.send(req.params.event_id);
    console.log("REQ.PARAMS.rso_ID: " + req.params.rso_id);

    //
    RSO.findOne({ rso_id: req.params.rso_id }).then(function(rso) {
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
router.get('/rso/:rso_id', function(req, res) {
    console.log("REQ.PARAMS.rso_id: " + req.params.rso_id);
    
    // check if this works by finding rso's unique _id and checking for update
    RSO.findOne({ rso_id: req.params.rso_id }).then(function(rso) {
        // send update back to as response
        res.send(rso);
    });
});

// API endpoint - post new rso
router.post('/rso', function(req, res, next) {
    console.log(req.body)
    RSO.create(req.body).then(function(rso) {
        res.send(rso);
    }).catch(next);
});

// API endpoint - update a rso
router.put('/rso/:rso_id', function(req, res) {
    console.log(req);
    
    // find rso document by id and update with request body
    RSO.findOneAndUpdate({ rso_id: req.params.rso_id }, req.body).then(function() {
        // check if this works by finding rso's unique _id and checking for update
        RSO.findOne({ rso_id: req.params.rso_id }).then(function(rso) {
            console.log(rso);
            // send update back to as response
            res.send(rso);
            
        });
    });
});

// API endpoint - delete a rso
router.delete('/rso/:rso_id', function(req, res) {
    // find rso document by id, delete
    RSO.findByIdAndRemove({ rso_id: req.params.rso_id }, req.body).then(function(rso) {
        // send update back to as response
        res.send(rso);
    });
})

// expoert router object with api endpoints
module.exports = router;