//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// import events object/schema so user can see each events comments
const Event = require('../models/events');

// create schema and model
// pass in object with different properties and their data types
const UserSchema = new Schema({
    // uid: {
    //     type: Number,
    //     default: 0
    // },
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
        //default: [{}]
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// add autoincrement feature
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'uid' });

// export so you can use in app
module.exports = mongoose.model('User', UserSchema);

// ... 
// create a new user in another file
//var newUser = new User({})