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
    NuofAvailableFirstSeats: {
        type: Number,
        required: true,
      },
    NuofAvailableBuisnessSeats: {
        type: Number,
        required: true,
      },
    NuofAvailableEconomySeats: {
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
     FlightNu: {
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
      EcoPrice: {
        type: Number,
        required: true
      },
      BusPrice: {
        type: Number,
        required: true
      },
      FPrice: {
        type: Number,
        required: true
      },

      DepartBool: {
        type: Boolean,
        required:false
      },
      ReturnBool:{
        type:Boolean,
        required:false
      },
      TripDuration:{
        type:String,
        required:true
      }

},
    { timestamps: false });

const flight = mongoose.model('flights', flightSchema);
module.exports = flight;