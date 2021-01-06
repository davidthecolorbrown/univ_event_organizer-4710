//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema and model
// pass in object with different properties and their data types
const NoteSchema = new Schema({
    date: {
        type: Date,
        //required: true,
        default: Date.now
    },
    // category: {
    //     // project, review, daily, school, random, idea
    //     type: String,
    //     default: "random"
    // },
    context: {
        // personal, professional, ..., other roles?
        type: String,
        default: "NaN"
    },
    type: {
        // personal: project, review-week/month/biannual/year, daily, random, idea
        // professional: project, job, school, random, idea
        type: String,
        default: "random"
    },
    title: {
        // project title, review, daily note, random
        type: String,
        default: "No title"
    },
    note: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        //required: true,
        default: Date.now
    }
});
// create new collection modelled after UserSchema
// used as model anytime a new user is created
//const Users = mongoose.model('Users', UsersSchema);

// export so you can use in app
//module.exports = Users;
module.exports = mongoose.model('Note', NoteSchema);

// ... 
// create a new user in another file
//var newUser = new User({})