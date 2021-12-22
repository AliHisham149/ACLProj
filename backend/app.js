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

const { v4: uuidv4 } = require('uuid');


var validator  = require('email-validator');


app.use(cors());

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
mongoose = require('mongoose');
const flight = require('./Models/flights.js')
const user = require('./Models/users.js')
const reservation = require('./Models/bookings.js');
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
    var  seatMap = []
    for(let i=0;i<req.body.FirstClassSeatsCount;i++){
        seatTemp = 'A' + i;
        seatMap.push(seatTemp);
    }
    for(let i=0;i<req.body.BusinessClassSeatsCount;i++){
        seatTemp = 'B' + i;
        seatMap.push(seatTemp);
    }
    for(let i=0;i<req.body.EconomyClassSeatsCount;i++){
        seatTemp = 'C' + i;
        seatMap.push(seatTemp);
    }
   

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
        'DepartureTime':req.body.DepartureTime, 
        'FlightCost':req.body.FlightCost,
        'TripDuration':req.body.TripDuration,
        'SeatMap':seatMap
    
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




//  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<SPRINT2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 
 app.get("/addReservation", (req, res) => {
    const flight1 = new booking({
         //User Data
      Uid: "jd10j92dja",
      Name:"Boody",
      Email:"alihisham12345@gmail.com",
      DateOfBirth:22-12-2021,

    //First Flight Data
      DepartureFlightNumber:"A69",
      DepartureFlightSeats:["23C","25A"],  //Array of Strings
      FirstFrom:"BERLIN",
      FirstTo:"PARIS",
      FirstFlightDate:21-2-2002,
      FirstTerminalDeparture:6,
      FirstTerminalArrival:2,
      FirstArrivalTime:"10:40",
      FirstDepartureTime:"9:20",
      FirstDuration:"1:20",
      FirstSeatType:["Economy","Business"],  //Array of Strings

      //Second Flight data
      ReturnFlightNumber:"A420",
      ReturnFlightSeats:["69A","420B"],
      SecondFrom:"PARIS",
      SecondTo:"BERLIN",
      SecondFlightDate:26-2-2002,
      SecondTerminalDeparture:3,
      SecondTerminalArrival:5,
      SecondArrivalTime:"11:55",
      SecondDepartureTime:"10:15",
      SecondDuration:"1:40",
      SecondSeatTypes:["Economy","Business"],


      TotalPrice:69.420

    })
    flight1.save();
    res.send("Reservation successfully added!")
})


app.post('/createReservation',(req,res)=>{
    const totalCost = req.body.FirstCost + req.body.SecondCost
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
      FirstDuration:req.body.FirstDuration,
      FirstSeatType:req.body.FirstSeatType,  //Array of Strings
      FirstCost:req.body.FirstCost,  
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
      SecondDuration:req.body.secondDuration,
      SecondSeatTypes:req.body.secondSeatTypes,
      SecondCost:req.body.secondCost,


      TotalPrice: totalCost,






    })
    reservation1.save().then((result) => {
        res.send(result)

        //Sending Email to user
        const msg = {
            to: req.body.email,
            from: 'test@example.com', // Use the email address or domain you verified above
            subject: 'A booking was made with this Email',
            text: 'you can go to this link to check out your bookings ',
          };
          sgMail.send(msg).then(() => {}, error => {
                    console.error(error);

                if (error.response) {
                console.error(error.response.body)
                }
                console.log("Email sent successfuly ")
            });
        
    })
        .catch((err) => {
            console.log(err)
        })

})



app.get("/getReservations",(req,res)=>{
    booking.find({}).exec(function(err, data){    
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
//Functions needed to be implemented 

app.post("/cancelReservation", (req, res) => {
    //1-This method should delete the reservation from the database of reservations
    //2-Should get first flight seats which were booked in the reservation and put them back in available seat map array 
    //3-Check for the first flight seats type and increase available seats of this type 
    //4- Repeat 2 and 3 for second flight  

    //find booking in bookings
    // const bookingID = req.body._id
    // const deptFlightNo = booking.find(bookingID).DepartureFlightNumber
    // const retFlightNo =  booking.find(bookingID).ReturnFlightNumber
    // const deptSeatCount = booking.find(bookingID).DepartureFlightSeats.length
    // const retSeatCount = booking.find(bookingID).ReturnFlightSeats.length
    // //get dep flight by flight number
    // //put seats from dep flight seats from booking back to dep seats in flights
    // for (let i = 0; i < deptSeatCount; i++){

    // }
    //increment available seats in flight by size of array^ BY TYPE
    //get return flight by flight number
    //put seats from booking back to return seats in flights
    //increment available seats in return flight record in collection flights by array size^
    //delete booking from bookings
   });