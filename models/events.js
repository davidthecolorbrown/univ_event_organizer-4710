//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

// import comments object/schema so user can see each events comments
const Comment = require('../models/comments');

// create schema and model
// pass in object with different properties and their data types
const EventSchema = new Schema({
    event_id: {
        type: Number,
        default: 0
    },
    time: {
        type: Date,
        //default: Date.now
    },
    location: {
        type: String,
        //default: "NaN"
    },
    event_name: {
        type: String,
        //default: "No name for event."
    },
    description: {
        type: String,
        //default: "No event description."
    },
    isRSO: {
        type: Boolean,
        //default: false
    },
    isPrivate: {
        type: Boolean,
        //default: false
    },
    RSO_id: {
        type: Number,
        //default: 0
    },
    title: {
        type: String,
        //default: "No event title (same as event_name)"
    },
    description: {
        type: String,
        //default: "No event description (same as description)"
    },
    admin_id: {
        type: Number,
        //default: 0
    },
    comments: {
        type: [Comment.schema],
        default: [{}]
    },
    date: {
        type: Date,
        //default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
// create new collection modelled after UserSchema
// used as model anytime a new user is created
//const Users = mongoose.model('Users', UsersSchema);
EventSchema.plugin(autoIncrement.plugin, { model: 'Event', field: 'event_id' });

// export so you can use in app
module.exports = mongoose.model('Event', EventSchema);

// ... 
// create a new user in another file
//var newUser = new User({})