const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    Uid: {
        type: String,
        required: true,
    },
    DepartureFlightNumber: {
        type: String,
        required: true,
    },
    ReturnFlightNumber: {
        type: Date,
        required: true,
    },
    DepartureFlightSeats: {
        type: [String],
        required: true,
    },
    ReturnFlightSeats: {
        type: [String],
        required: true,
    },
    TotalPrice: {
        type: Number,
        required: true,
    },
},
    { timestamps: false });

const booking = mongoose.model('bookings', bookingSchema);
module.exports = booking;