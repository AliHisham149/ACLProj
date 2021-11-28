const express = require('express'),
    app = express();
app.use(express.json());
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(8080, process.env.IP, () => {
    console.log('Server successfully started!');
});
const cors = require('cors');

app.use(cors());

mongoose = require('mongoose');
const flight = require('./Models/flights.js')
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

app.get("/showFlights" , (req, res) => {                                               ``
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
 
