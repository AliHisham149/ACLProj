const mongoose = require('mongoose')
const Schema = mongoose.Schema

const existingUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: false });

const existingUsers = mongoose.model('existingUsers', existingUserSchema);
module.exports = existingUsers