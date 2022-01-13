const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    Uid: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    CountryCode: {
        type: String,
        required: true,
    },
    PassportNo: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    PhoneNumber: {
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