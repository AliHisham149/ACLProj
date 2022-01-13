const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    
    //User Data
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
    DateOfBirth: {
        type: String,
        required: true,
      },



      
      //First flight (To destination) Data
    DepartureFlightNumber: {
        type: String,
        required: true,
    },
    DepartureFlightSeats: {
        type: [String],
        required: true,
    }, 
    FirstFrom: {
        type: String,
        required: true,
    },
    FirstTo: {
        type: String,
        required: true,
    },
    FirstFlightDate: {
        type: Date,
        required: true,
    },
    FirstTerminalDeparture: {
        type: Number,
        required: true,
      },
      FirstTerminalArrival: {
        type: Number,
        required: true,
    
      },
     FirstArrivalTime: {
        type: String,
        required: true
      },
      FirstDepartureTime: {
        type: String,
        required: true
      },
      FirstDuration:{
          type:String,
          required:true
      },
      FirstSeatType:{
          type:[String],
          required:true
      },
      FirstCost:{
        type:Number,
        required:true
      },








      //Second flight (from destination) Data
    ReturnFlightNumber: {
        type: String,
        required: true,
    },
    ReturnFlightSeats: {
        type: [String],
        required: true,
    },
    SecondFrom: {
        type: String,
        required: true,
    },
    SecondTo: {
        type: String,
        required: true,
    },
    SecondFlightDate: {
        type: Date,
        required: true,
    },
    SecondTerminalDeparture: {
        type: Number,
        required: true,
      },
      SecondTerminalArrival: {
        type: Number,
        required: true,
    
      },
     SecondArrivalTime: {
        type: String,
        required: true
      },
      SecondDepartureTime: {
        type: String,
        required: true
      },
      SecondDuration:{
          type:String,
          required:true
      },
      SecondSeatTypes:{
          type:[String],
          required:true
      },
      SecondCost:{
          type:Number,
        required:true
      },
      //Price Of reservation (Both flights combined)
    TotalPrice: {
        type: Number,
        required: true,
    },
},
    { timestamps: false });

const reservation = mongoose.model('reservations', reservationSchema);
module.exports = reservation;