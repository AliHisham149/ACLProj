const express = require('express'),
app = express();
app.use(express.json());

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000, process.env.IP, () => {
    console.log('Server successfully started!');
});
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');


var validator  = require('email-validator');


app.use(cors());

mongoose = require('mongoose');
const flight = require('./Models/flights.js')
const user = require('./Models/users.js')
const reservation = require('.Models/bookins.js');
const booking = require('./Models/bookings.js');
require('dotenv').config(); 
app.use(express.json());
const uri = "mongodb://ACLTeam:ACLTeam123@cluster0-shard-00-00.o2jpy.mongodb.net:27017,cluster0-shard-00-01.o2jpy.mongodb.net:27017,cluster0-shard-00-02.o2jpy.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4vsmho-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected!!");
});

app.get("/addFlight", (req, res) => {
    const flight1 = new flight({
        From: "BER",
        To: "CHG",
        FlightDate: 2022 - 1 - 12,
        FirstClassSeatsCount:2,
        BusinessClassSeatsCount: 20,
        EconomyClassSeatsCount:5,
        TerminalDeparture:3,
        TerminalArrival:5,
        FlightNumber:4,
        ArrivalTime:6,
        DepartureTime:3

    })
    flight1.save();
    res.send("Flight successfully added!")
})


app.post('/createReservation',(req,res)=>{
    const reservation1 = new booking({
      //User Data
      Uid: req.body.uid,
      Name:req.body.name,
      Email:req.body.email,
      DateOfBirth:req.body.dob,

    //First Flight Data
      DepartureFlightNumber:req.body.depflightno,
      DepartureFlightSeats:req.body.depFlightSeats,  //Array of Strings
      FirstFrom:req.body.firstFrom,
      FirstTo:req.body.firstTo,
      FirstFlightDate:req.body.firstDate,
      FirstTerminalDeparture:req.body.firstTerminalDep,
      FirstTerminalArrival:req.body.FirstTerminalArr,
      FirstArrivalTime:req.body.FirstArrTime,
      FirstDepartureTime:req.body.FirstDepTime,
      FirstSeatType:req.body.FirstSeatType,  //Array of Strings

      //Second Flight data
      ReturnFlightNumber:req.body.retFlightNumber,
      ReturnFlightSeats:req.body.retFlightSeats,
      SecondFrom:req.body.secondFrom,
      SecondTo:req.body.secondTo,
      SecondFlightDate:req.body.secondFlightDate,
      SecondTerminalDeparture:req.body.secondTerminalDep,
      SecondTerminalArrival:req.body.SecondTerminalArr,
      SecondArrivalTime:req.body.secondArrTime,
      SecondDepartureTime:req.body.secondDepTime,
      SecondSeatTypes:req.body.secondSeatTypes,


      TotalPrice:req.body.price,


    })
    reservation1.save().then((result) => {
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })

})

app.get("/getReservations",(req,res)=>{

    reservation.find({}).exec(function(err, data){
        
        res.send(data)
        
    })

})

app.get("/createUser",(req,res) =>{
            var today = new Date();
            const user1 = new user({
                Uid: uuidv4(),//Generate new random user ID 
                Name:req.body.name,
                Email:req.body.email,
                Password:req.body.password,
                DateOfBirth:today , 
            })
            user1.save().then((result) => {
                res.send(result)
            })
                .catch((err) => {
                    console.log(err)
                })
})


app.get("/showFlights" , (req, res) => {                                               
    flight.find({}).exec(function(err, data){
        res.send(data)
    })
    
});
app.post("/deleteFlights", (req, res) => {
    flight.deleteOne({ _id : req.body._id}).exec(function (err, leads) {
           res.status(201).send(leads);
       });
   });
   app.post("/updateFlights", (req, res) => {
    flight.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
        res.status(201).send(leads);
    });
});

app.post("/addFlight", (req, res) => {
    const newFlight = new flight({
        'From': req.body.From, 
        'To': req.body.To, 
        'FlightDate': req.body.FlightDate, 
        'FirstClassSeatsCount': req.body.FirstClassSeatsCount,
        'BusinessClassSeatsCount': 
        req.body.BusinessClassSeatsCount,
        'EconomyClassSeatsCount':  req.body.EconomyClassSeatsCount, 
        'TerminalDeparture':req.body.TerminalDeparture, 
        'TerminalArrival': req.body.TerminalArrival,
        'FlightNumber':req.body.FlightNumber, 
        'ArrivalTime':req.body.ArrivalTime, 
        'DepartureTime':req.body.DepartureTime 
    
 })
    newFlight.save().then((result) => {
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })

})

app.post("/searchFlights",async (req, res) => {
   
    const criteria = req.body; 
    try{
        const query=await flight.find(criteria);
        res.json(query);
 
    }catch (err){
        res.json({message:err});}
    
 });
 
