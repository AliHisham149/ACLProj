const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    DepartId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "flights"
    },
     DepartPassengersAdult:{
        type: Number,
        required: false
     },
     DepartPassengersChild:{
        type: Number,
        required: false
     },
      DepartCabin:{
        type:String,
        required:false
      },
      DepartSeats:{
        type:Object,
        required:false
      },
      DepartPrice:{
        type: Number,
        required: false
      },
      DepartPriceTotal:{
        type: Number,
        required: false
      },
      ReturnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flights"
      },
     ReturnPassengersAdult:{
        type: Number,
        required: false
     },
     ReturnPassengersChild:{
        type: Number,
        required: false
     },
      ReturnCabin:{
        type:String,
        required:false
      },
      ReturnSeats:{
        type:Object,
        required:false
      },
      ReturnPrice:{
        type: Number,
        required: false
      },
      ReturnPriceTotal:{
        type: Number,
        required: false
      },
      SubTotal:{
        type:Number,
        required:false
    },
    Total:{
      type:Number,
      required:false
    }
    ,
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "existingUsers",
        unique: false
      }
},
    { timestamps: false });

const reservations = mongoose.model('reservations', reservationSchema);
module.exports = reservations;