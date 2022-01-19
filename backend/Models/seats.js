
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seatsSchema = new Schema({
    FlightID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "flights"
    },
    reservedEcoSeats:{
        type:Object,
        required:false
      },
      reservedBusSeats:{
        type:Object,
        required:false
      },
      reservedFstSeats:{
        type:Object,
        required:false
      },
      reservedSeats:{
        type:Object,
        required:false
      },
      fullyBooked:{
          type:Boolean,
          required:false
      }
},
    { timestamps: false });

const seats = mongoose.model('Seats', seatsSchema);
module.exports = seats;