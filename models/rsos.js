//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// import events/user object/schema so RSO has a list of events, users
const Event = require('../models/events');
const User = require('../models/users');

// create schema and model
// pass in object with different properties and their data types
const RSOSchema = new Schema({
    // rso_id: {
    //     type: Number,
    //     default: 0
    // },
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

// add autoincrement feature
UserSchema.plugin(autoIncrement.plugin, { model: 'RSO', field: 'rso_id' });

// export so you can use in app
module.exports = mongoose.model('RSO', RSOSchema);

// ... 
// create a new user in another file
//var newUser = new User({})