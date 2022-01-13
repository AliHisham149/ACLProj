const {Router} = require('express');
const reservation = require('../models/reservation');
const flight = require('../models/flights');
const reservationsRouter = new Router();

//Test Add reservation
 reservationsRouter.get("/addReservation", (req, res) => {
    const flight1 = new reservation({
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

//Actual Add reservation
reservationsRouter.post('/createReservation',async (req,res)=>{
    const totalCost = req.body.totalCost
    const firstFlightID = req.body._id
    const secondFlightID = req.body._id2
    console.log(req.body)
    const reservation1 = new reservation({
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
        console.log(flight1);
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
        const msg = {
            to: req.body.email,
            from: 'test@example.com', // Use the email address or domain you verified above
            subject: 'A reservation was made with this Email',
            text: 'you can go to this link to check out your reservations ',
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

//cancel reservation
reservationsRouter.post("/cancelReservation", (req, res) => {
    const msg = {
        to: req.body.email,
        from: 'test@example.com', // Use the email address or domain you verified above
        subject: 'A reservation was cancelled with this Email',
        text: 'you can go to this link to check out your reservations ',
      };
      sgMail.send(msg).then(() => {}, error => {
                console.error(error);

            if (error.response) {
            console.error(error.response.body)
            }
            console.log("Email sent successfuly ")
        });
   
    //find reservation in reservations
    const reservationID = req.body._id
    const deptFlightNo = reservation.find(reservationID).DepartureFlightNumber
    const retFlightNo =  reservation.find(reservationID).ReturnFlightNumber
    const deptSeatCount = reservation.find(reservationID).DepartureFlightSeats.length
    const retSeatCount = reservation.find(reservationID).ReturnFlightSeats.length
    
    //put seats from dep flight seats from reservation back to dep seats in flights
    for (let i = 0; i < deptSeatCount; i++) {
        // Move seats from reservation to be available in flight 
        flight.find(deptFlightNo).SeatMap.push(reservation.find(reservationID).DepartureFlightSeats[i])

        // Increase number of available seats depending on seat type in flight 
        if (reservation.find(reservationID).FirstSeatType[i]=== "Economy") {
            flight.find(deptFlightNo).EconomyClassSeatsCount++
        }
        else if (reservation.find(reservationID).FirstSeatType[i]=== "Business") {
            flight.find(deptFlightNo).BusinessClassSeatsCount++
        }
        else {
            flight.find(deptFlightNo).FirstClassSeatsCount++
        }
    }

    // Repeat same loop for the return flight in resevation
    for (let i = 0; i < retSeatCount; i++){
        flight.find(retFlightNo).SeatMap.push(reservation.find(reservationID).ReturnFlightSeats[i])

        if (reservation.find(reservationID).FirstSeatType[i]=== "Economy") {
            flight.find(retFlightNo).EconomyClassSeatsCount++
        }
        else if (reservation.find(reservationID).FirstSeatType[i]=== "Business") {
            flight.find(retFlightNo).BusinessClassSeatsCount++
        }
        else {
            flight.find(retFlightNo).FirstClassSeatsCount++
        }
    }
    reservation.deleteOne({ _id : req.body._id}).exec(function (err, leads) {
        res.status(201).send(leads);
    });
    //Remove reservation from reservations
   });

//get reservations
reservationsRouter.get("/getReservations",(req,res)=>{
    reservation.find({}).exec(function(err, data){    
        res.send(data)     
    })
})

module.exports = reservationsRouter;
