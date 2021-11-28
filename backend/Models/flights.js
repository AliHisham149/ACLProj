const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flightSchema = new Schema({
    From: {
        type: String,
        required: true,
    },
    To: {
        type: String,
        required: true,
    },
    FlightDate: {
        type: Date,
        required: true,
    },
    FirstClassSeatsCount: {
        type: Number,
        required: true,
      },
      BusinessClassSeatsCount: {
        type: Number,
        required: true,
      },
      EconomyClassSeatsCount: {
        type: Number,
        required: true,
      },
      TerminalDeparture: {
        type: Number,
        required: true,
      },
      TerminalArrival: {
        type: Number,
        required: true,
    
      },
     FlightNumber: {
        type: String,
        required: true
      },
     ArrivalTime: {
        type: String,
        required: true
      },
      DepartureTime: {
        type: String,
        required: true
      },
},
    { timestamps: false });

const flight = mongoose.model('flights', flightSchema);
module.exports = flight;