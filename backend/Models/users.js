const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    Uid: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
      },
    DateOfBirth: {
        type: String,
        required: true,
      },
},
    { timestamps: false });

const user = mongoose.model('users', userSchema);
module.exports = user;