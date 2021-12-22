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
    for(let i=1;i<req.body.FirstClassSeatsCount+1;i++){
        seatTemp = 'A' + i;
        seatMap.push(seatTemp);
    }
    for(let i=1;i<req.body.BusinessClassSeatsCount+1;i++){
        seatTemp = 'B' + i;
        seatMap.push(seatTemp);
    }
    for(let i=1;i<req.body.EconomyClassSeatsCount+1;i++){
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
        'TripDuration':req.body.FlightDuration,
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
      FirstCost:20,

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
      SecondCost:40,


      TotalPrice:60

    })
    flight1.save();



    res.send("Reservation successfully added!")
})


app.post('/createReservation',async (req,res)=>{
    const totalCost = req.body.totalCost
    const firstFlightID = req.body._id
    const secondFlightID = req.body._id2
    
    const reservation1 = new booking({
      //User Data
      Uid: req.body.uid,
      Name:req.body.name,
      Email:req.body.email,
      DateOfBirth:req.body.dob,
    //First Flight Data
      DepartureFlightNumber:req.body.depFlightNo,
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

    //find flight and 2 
    //remove them from databse
    // update them hena 
    //add them lel db tany
    


    var flight1 = await flight.find({_id:firstFlightID}).then((result)=>{
        return result;
    }).catch(err => console.error(`Failed to find document: ${err}`));



    var flight2 = await flight.find({_id:secondFlightID}).then((result)=>{
        return result;
    }).catch(err => console.error(`Failed to find document: ${err}`));

    flight.deleteOne({_id:firstFlightID}).then((result)=>{
        console.log(result)
    }).catch(err => console.error(`Failed to find document: ${err}`));
    
    flight.deleteOne({_id:secondFlightID}).then((result)=>{
        console.log(result)
    }).catch(err => console.error(`Failed to find document: ${err}`));



    // Remove booked seats from flights' seat maps
     var deptSeatCount = req.body.depFlightSeats.length
     var retSeatCount = req.body.retFlightSeats.length



    for (let i = 0; i < deptSeatCount; i++) {
        // Remove seats from seat map of flight
        flight1[0]["SeatMap"].pop(req.body.retFlightSeats[i])

        // Decrement number of available seats depending on seat type in flight 
        if (req.body.FirstSeatType[i] === "Economy") {
            flight1[0]['EconomyClassSeatsCount']--
        }
        else if (req.body.FirstSeatType[i]=== "Business") {
            flight1[0]['BusinessClassSeatsCount']--
        }
        else {
            flight1[0]['FirstClassSeatsCount']--
        }
    }

    for (let i = 0; i < retSeatCount; i++) {
        // Remove seats from seat map of flight
        flight2[0]["SeatMap"].pop(req.body.retFlightSeats[i])

        // Decrement number of available seats depending on seat type in flight 
        if (req.body.secondSeatTypes[i] === "Economy") {
            flight2[0]['EconomyClassSeatsCount']--
        }
        else if (req.body.secondSeatTypes[i] === "Business") {
            flight2[0]['BusinessClassSeatsCount'] --
        }
        else {
            flight2[0]['FirstClassSeatsCount']--
        }
    }
    

    const newFlight1 = new flight({
            From: flight1[0]["From"],
            To: flight1[0]["To"],
            FlightDate: flight1[0]["FlightDate"],
            FirstClassSeatsCount:flight1[0]["FirstClassSeatsCount"],
            BusinessClassSeatsCount:flight1[0]["BusinessClassSeatsCount"],
            EconomyClassSeatsCount:flight1[0]["EconomyClassSeatsCount"],
            TerminalDeparture:flight1[0]["TerminalDeparture"],
            TerminalArrival:flight1[0]["TerminalArrival"],
            FlightNumber:flight1[0]["FlightNumber"],
            ArrivalTime:flight1[0]["ArrivalTime"],
            DepartureTime:flight1[0]["DepartureTime"],
            FlightCost:flight1[0]["FlightCost"],
            TripDuration:flight1[0]["TripDuration"],
            SeatMap:flight1[0]["SeatMap"],

    })
    const newFlight2 = new flight({
        From: flight2[0]["From"],
        To: flight2[0]["To"],
        FlightDate: flight2[0]["FlightDate"],
        FirstClassSeatsCount:flight2[0]["FirstClassSeatsCount"],
        BusinessClassSeatsCount:flight2[0]["BusinessClassSeatsCount"],
        EconomyClassSeatsCount:flight2[0]["EconomyClassSeatsCount"],
        TerminalDeparture:flight2[0]["TerminalDeparture"],
        TerminalArrival:flight2[0]["TerminalArrival"],
        FlightNumber:flight2[0]["FlightNumber"],
        ArrivalTime:flight2[0]["ArrivalTime"],
        DepartureTime:flight2[0]["DepartureTime"],
        FlightCost:flight2[0]["FlightCost"],
        TripDuration:flight2[0]["TripDuration"],
        SeatMap:flight2[0]["SeatMap"],


})




    newFlight1.save()
    newFlight2.save()
    

    reservation1.save().then((result) => {
        res.send(result)

        //Sending Email to user
        
        
        
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
   
    //find booking in bookings
    const bookingID = req.body._id
    const deptFlightNo = booking.find(bookingID).DepartureFlightNumber
    const retFlightNo =  booking.find(bookingID).ReturnFlightNumber
    const deptSeatCount = booking.find(bookingID).DepartureFlightSeats.length
    const retSeatCount = booking.find(bookingID).ReturnFlightSeats.length
    
    //put seats from dep flight seats from booking back to dep seats in flights
    for (let i = 0; i < deptSeatCount; i++) {
        // Move seats from booking to be available in flight 
        flight.find(deptFlightNo).SeatMap.push(booking.find(bookingID).DepartureFlightSeats[i])

        // Increase number of available seats depending on seat type in flight 
        if (booking.find(bookingID).FirstSeatType[i]=== "Economy") {
            flight.find(deptFlightNo).EconomyClassSeatsCount++
        }
        else if (booking.find(bookingID).FirstSeatType[i]=== "Business") {
            flight.find(deptFlightNo).BusinessClassSeatsCount++
        }
        else {
            flight.find(deptFlightNo).FirstClassSeatsCount++
        }
    }

    // Repeat same loop for the return flight in resevation
    for (let i = 0; i < retSeatCount; i++){
        flight.find(retFlightNo).SeatMap.push(booking.find(bookingID).ReturnFlightSeats[i])

        if (booking.find(bookingID).FirstSeatType[i]=== "Economy") {
            flight.find(retFlightNo).EconomyClassSeatsCount++
        }
        else if (booking.find(bookingID).FirstSeatType[i]=== "Business") {
            flight.find(retFlightNo).BusinessClassSeatsCount++
        }
        else {
            flight.find(retFlightNo).FirstClassSeatsCount++
        }
    }
    booking.deleteOne({ _id : req.body._id}).exec(function (err, leads) {
        res.status(201).send(leads);
    });
    //Remove booking from bookings
   });