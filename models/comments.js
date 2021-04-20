//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const autoIncrement = require('mongoose-auto-increment');

// create schema and model
// pass in object with different properties and their data types
const CommentSchema = new Schema({
    cid: {
        type: Number,
        default: 0
    },
    uid: {
        type: Number,
        default: 0
    },
    event_id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: "No Comment Title"
    },
    body: {
        type: String,
        default: "No Comment Body"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 5
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// add autoincrement feature
//CommentSchema.plugin(autoIncrement.plugin, { model: 'Comment', field: 'cid' });

// export so you can use in app
module.exports = mongoose.model('Comment', CommentSchema);

// ... 
// create a new user in another file
//var newUser = new User({})