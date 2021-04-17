//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import events/user object/schema so RSO has a list of events, users
const Event = require('../models/events');
const User = require('../models/users');

// create schema and model
// pass in object with different properties and their data types
const RSOSchema = new Schema({
    RSO_id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: "No RSO name"
    },
    description: {
        type: String,
        default: "No RSO description"
    },
    admin: {
        type: Number,
        default: 0
    },
    users: {
        type: [User.schema],
        default: [{}]
    },
    events: {
        type: [Event.schema],
        default: [{}]
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
// create new collection modelled after UserSchema
// used as model anytime a new user is created
//const Users = mongoose.model('Users', UsersSchema);

// export so you can use in app
module.exports = mongoose.model('RSO', RSOSchema);

// ... 
// create a new user in another file
//var newUser = new User({})