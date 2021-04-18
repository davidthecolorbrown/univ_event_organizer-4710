//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import events object/schema so user can see each events comments
const Event = require('../models/events');

// create schema and model
// pass in object with different properties and their data types
const UserSchema = new Schema({
    uid: {
        type: Number,
        default: 1
    },
    firstname: {
        type: String,
        default: "NaN"
    },
    lastname: {
        type: String,
        default: "NaN"
    },
    login: {
        type: String
    },
    email: {
        type: String
    },
    pw: {
        type: String
    },
    isSuper: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
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
module.exports = mongoose.model('User', UserSchema);

// ... 
// create a new user in another file
//var newUser = new User({})