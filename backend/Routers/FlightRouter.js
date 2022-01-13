const {Router} = require('express');
const flight = require('../models/flights');
const flightRouter = new Router();


flightRouter.get("/showFlights" , (req, res) => {                                               
    flight.find({}).exec(function(err, data){
        res.send(data)
    })
    
});
flightRouter.post("/deleteFlights", (req, res) => {
    flight.deleteOne({ _id : req.body._id}).exec(function (err, leads) {
           res.status(201).send(leads);
       });
   });
   flightRouter.post("/updateFlights", (req, res) => {
    flight.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
        res.status(201).send(leads);
    });
});

flightRouter.post("/addFlight", (req, res) => {
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

flightRouter.post("/searchFlights",async (req, res) => {
   
    const criteria = req.body; 
    try{
        const query=await flight.find(criteria);
        res.json(query);
 
    }catch (err){
        res.json({message:err});}
    
 });

 flightRouter.get("/addFlight", (req, res) => {
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

module.exports = flightRouter;
