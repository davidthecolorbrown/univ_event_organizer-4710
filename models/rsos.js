//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema and model
// pass in object with different properties and their data types
const RSOSchema = new Schema({
    uid: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        default: "No RSO name"
    },
    description: {
        type: String,
        default: "No RSO description"
    },
    isAdmin: {
        type: Boolean,
        default: false
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