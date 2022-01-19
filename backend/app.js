const express = require('express'),
    app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080, process.env.IP, () => {
    console.log('Server successfully started!');
});
const cors = require('cors');

app.use(cors());
let dt = fs.readFileSync('./constantData.json');
let constantData = JSON.parse(dt);
let sc = fs.readFileSync('./seatChart.json');
let seatsChart = JSON.parse(sc);
mongoose = require('mongoose');
const passwordValidator = require('password-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const flight = require('./Models/flights.js')
//var jwt = require('express-jwt');


var nodemailer = require('nodemailer');



const stripe = require('stripe')('sk_test_51K9xnYIbRPMFvA35UonKXnl680HBGH99mpgoCIrfRdlNt8PDogIMxTZASCoBMOikYA4UYjF0ZjvG2JMmu8wsgnKd00IpWbq57l');
const seats = require('./Models/seats.js')
const existing = require('./Models/users.js');
const reservations = require('./Models/Reservations.js');

const { v4: uuidv4 } = require('uuid');
const admin = require('./Models/admins.js')
require('dotenv').config(); // configures dotenv
app.use(express.json());
// MongoDB connection with ATLAS and Mongoose
// connects to the value within the .env file
const uri = "mongodb://ACLTeam:ACLTeam123@cluster0-shard-00-00.o2jpy.mongodb.net:27017,cluster0-shard-00-01.o2jpy.mongodb.net:27017,cluster0-shard-00-02.o2jpy.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4vsmho-shard-0&authSource=admin&retryWrites=true&w=majority";
// connects mongoose to the uri and sets some mongoose keys to true to combat mongoose's deprecation warnings
mongoose.connect(uri, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
// make sure that MongoDB connected successfully
connection.once('open', () => {
    console.log("MongoDB connected!!");
});

//console.log(data);

app.get("/showFlights", (req, res) => {
    ``
    flight.find({}).exec(function (err, data) {
        res.send(data)
    })

});
app.post("/deleteFlights", (req, res) => {
    flight.deleteOne({ _id: req.body._id }).exec(function (err, leads) {
        res.status(201).send(leads);
    });
});
app.post("/editDep",(req,res)=>{

})


app.post("/updateFlights", (req, res) => {
    v = checkFlightDetails(req.body.FlightNu, req.body.From,
        req.body.To, req.body.NuofAvailableFirstSeats, req.body.NuofAvailableBuisnessSeats,
        req.body.NuofAvailableEconomySeats, req.body.TerminalDeparture,
        req.body.TerminalArrival, req.body.ArrivalTime, req.body.DepartureTime, req.body.ecoPrice, req.body.busPrice, req.body.FPrice, req.body.DepartBool,
        req.body.ReturnBool, req.body.FlightDate);
    if (v != "No type errors") {
        res.status(403).send(v);
        return;
    }

    else {
        flight.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
            res.status(201).send(leads);
        });
    }
});




function checkFlightDetails(FlightNu, From, To, fstSeats, busSeats, ecoSeats, tdepart, tarrive, arrivalT, departT, ecoPrice, busPrice, Fprice, DepartB, ReturnB, FlightDate) {
    
    if (FlightNu != undefined || From != undefined || To != undefined || fstSeats != undefined || busSeats != undefined || ecoSeats != undefined || tdepart != undefined || tarrive != undefined || arrivalT != undefined || departT != undefined || ecoPrice != undefined || busPrice != undefined || Fprice != undefined || DepartB != undefined || ReturnB != undefined || tripD != undefined) {
        if (FlightNu === "" || From === "" || To === "" || fstSeats === "" || busSeats === "" || ecoSeats === "" || tdepart === "" || tarrive === "" || arrivalT === "" || departT === "" || ecoPrice === "" || busPrice === "" || Fprice === "" || DepartB === "" || ReturnB === "" || FlightDate === "") {
            return ("All fields are required");
        }

        if (Number(fstSeats) < 0 || Number(busSeats) < 0 || Number(ecoSeats) < 0 || From === To) {
            return ("please enter valid inputs");
        }
        if (Number(tarrive) < 0 || Number(tdepart) < 0) {
            return ("please enter valid inputs");

        }
        if (Number(ecoPrice) < 0 || Number(busPrice) < 0 || Number(Fprice) < 0) {
            return ("please enter valid inputs");

        }
        if (new Date(FlightDate) < new Date()) {
            return ("please enter valid Dates");
        }
        if (Number(departT.substring(0, 2)) >= Number(arrivalT.substring(0, 2))) {
            return ("please enter valid timings");
        }

    }
    return "No type errors";
}
app.post("/addFlight", async (req, res) => {
    v = checkFlightDetails(req.body.FlightNu, req.body.From,
        req.body.To, req.body.NuofAvailableFirstSeats, req.body.NuofAvailableBuisnessSeats,
        req.body.NuofAvailableEconomySeats, req.body.TerminalDeparture,
        req.body.TerminalArrival, req.body.ArrivalTime, req.body.DepartureTime, req.body.ecoPrice, req.body.busPrice, req.body.FPrice, req.body.DepartBool,
        req.body.ReturnBool, req.body.FlightDate);
    if (v != "No type errors") {
        res.status(403).send(v);
        return;
    }
    const query2 = await flight.find({
        'From': req.body.From,
        'To': req.body.To,
        'FlightDate': req.body.FlightDate,
        'NuofAvailableFirstSeats': req.body.NuofAvailableFirstSeats,
        'NuofAvailableBuisnessSeats':
            req.body.NuofAvailableBuisnessSeats,
        'NuofAvailableEconomySeats': req.body.NuofAvailableEconomySeats,
        'TerminalDeparture': req.body.TerminalDeparture,
        'TerminalArrival': req.body.TerminalArrival,
        'ArrivalTime': req.body.ArrivalTime,
        'DepartureTime': req.body.DepartureTime,
        'EcoPrice': req.body.ecoPrice,
        'BusPrice': req.body.busPrice,
        'FPrice': req.body.FPrice,

        'TripDuration': req.body.TripDuration

    });
    if (query2.length == 0) {
        exis = false;
    }
    else {
        exis = true;
    }
    const query = await flight.find({ FlightNu: req.body.FlightNu });
    if (query.length == 0)
        var found = false
    else
        found = true
    if (found) {
        res.status(403).send("This flight number already exists")
    }
    else if (exis) {
        res.status(403).send("This flight already exists")
    }

    else {
        const newFlight = new flight({
            'From': req.body.From,
            'To': req.body.To,
            'FlightDate': req.body.FlightDate,
            'NuofAvailableFirstSeats': req.body.NuofAvailableFirstSeats,
            'NuofAvailableBuisnessSeats':
                req.body.NuofAvailableBuisnessSeats,
            'NuofAvailableEconomySeats': req.body.NuofAvailableEconomySeats,
            'TerminalDeparture': req.body.TerminalDeparture,
            'TerminalArrival': req.body.TerminalArrival,
            'FlightNu': req.body.FlightNu,
            'ArrivalTime': req.body.ArrivalTime,
            'DepartureTime': req.body.DepartureTime,
            'EcoPrice': req.body.ecoPrice,
            'BusPrice': req.body.busPrice,
            'FPrice': req.body.FPrice,
            'DepartBool': req.body.DepartBool,
            'ReturnBool': req.body.ReturnBool,
            'TripDuration': req.body.TripDuration

        })
        newFlight.save().then((result) => {
            res.send(result)
            // assignFlightSeats(req.body.NuofAvailableEconomySeats, req.body.NuofAvailableBuisnessSeats, req.body.NuofAvailableFirstSeats, result._id);
        })
            .catch((err) => {
                console.log(err)
            })
    }
})

app.post("/searchFlights", async (req, res) => {
    const criteria = req.body;
    console.log(req.body);
    try {
        const query = await flight.find(criteria);
        // console.log(query);
        // console.log("xxxx111");
       console.log(query);
        res.json(query);

    } catch (err) {
        res.json({ message: err });
    }

});

app.post("/searchDepartureFlights", async (req, res) => {
    const criteria = { From: req.body.From, To: req.body.To, FlightDate: req.body.departureDate, DepartBool: true };
    let c = req.body.cabin;
    let total = req.body.adults + req.body.child;
    try {
        const fquery = await flight.find(criteria);//result set is query
        //sends each one as an object in an array
        let r = [];
        for (var i = 0; i < fquery.length; i++) {
            let f = fquery[i]._id;
            const squery = await seats.find({ FlightID: f });
            let cond = squery.length == 0;//if flight has no reserved seats yet
            if (!cond) {
                ob = await getSeatNumbers(f);
                if (c == "Economy") {
                    capacity = ob.e;
                    c2 = (squery[0].reservedEcoSeats.length == capacity) || ((capacity - squery[0].reservedEcoSeats.length) < total)//not enough pass
                }
                else if (c == "Business") {
                    capacity = ob.b;
                    c2 = (squery[0].reservedBusSeats.length == capacity) || ((capacity - squery[0].reservedBusSeats.length) < total)
                }
                else {
                    capacity = ob.f;
                    c2 = (squery[0].reservedFstSeats.length == capacity) || ((capacity - squery[0].reservedFstSeats.length) < total);
                }
                if (!c2) {
                    r.push(fquery[i]);
                }
            }
            else {
                r.push(fquery[i]);
            }
        }
        let re = [];
        for (var i = 0; i < r.length; i++) {
            x = r[i];
            x = x.toJSON();
            if (c == "Economy") {
                p = x.EcoPrice;
            }
            else if (c == "Business") {
                p = x.BusPrice;
            }
            else {
                p = x.FPrice;
            }
            delete x.EcoPrice;
            delete x.BusPrice;
            delete x.FPrice;
            x.price = p;
            re.push(x);
        }
        res.json(re);
    } catch (err) {
        res.json({ message: err });
    }
});

app.post("/searchReturnFlights", async (req, res) => {

    const criteria = { From: req.body.From, To: req.body.To, FlightDate: req.body.departureDate, ReturnBool: true };
    let c = req.body.cabin;
    let total = req.body.adults + req.body.child;
    try {
        const fquery = await flight.find(criteria);//result set is query
        //sends each one as an object in an array
        let r = [];
        for (var i = 0; i < fquery.length; i++) {
            let f = fquery[i]._id;
            const squery = await seats.find({ FlightID: f });
            let cond = squery.length == 0;//if flight has no reserved seats yet
            if (!cond) {
                ob = await getSeatNumbers(f);
                if (c == "Economy") {
                    capacity = ob.e;
                    c2 = (squery[0].reservedEcoSeats.length == capacity) || ((capacity - squery[0].reservedEcoSeats.length) < total)//not enough pass
                }
                else if (c == "Business") {
                    capacity = ob.b;
                    c2 = (squery[0].reservedBusSeats.length == capacity) || ((capacity - squery[0].reservedBusSeats.length) < total)
                }
                else {
                    capacity = ob.f;
                    c2 = (squery[0].reservedFstSeats.length == capacity) || ((capacity - squery[0].reservedFstSeats.length) < total);
                }
                if (!c2) {
                    r.push(fquery[i]);
                }
            }
            else {
                r.push(fquery[i]);
            }
        }
        let re = [];
        for (var i = 0; i < r.length; i++) {
            x = r[i];
            x = x.toJSON();
            if (c == "Economy") {
                p = x.EcoPrice;
            }
            else if (c == "Business") {
                p = x.BusPrice;
            }
            else {
                p = x.FPrice;
            }
            delete x.EcoPrice;
            delete x.BusPrice;
            delete x.FPrice;
            x.price = p;
            re.push(x);
        }
        res.json(re);
    } catch (err) {
        res.json({ message: err });
    }

});
function getFlightSeats(eco, bus, fst) {
    const f = seatsChart.FirstSeats.slice(0, fst);
    const b = seatsChart.BusinessSeats.slice(0, bus);
    const e = seatsChart.EconomySeats.slice(0, eco);
    ob = { economy: e, first: f, business: b };
    return ob;

}
async function getSeatNumbers(flightID) {
    const data = await flight.find({ _id: flightID });
    fst = data[0].NuofAvailableFirstSeats;
    bus = data[0].NuofAvailableBuisnessSeats;
    eco = data[0].NuofAvailableEconomySeats;
    ob = { f: fst, b: bus, e: eco };
    return ob;
}
function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
// app.post("/getAvailableCabinSeats", async (req, res) => {
//     c = await getAvailableCabinSeat(req.body.cabin, req.body.FlightID);
//     res.send(c);
// })
app.post("/getAvailableCabinSeats", async (req, res) => {
    getAvailableCabinSeat(req.body.cabin, req.body.FlightID).then((result) => {
        res.send(result)
    })
        .catch((err) => {
        })
})
app.post("/showReservedCabinSeats", async (req, res) => {
    let c = req.body.cabin;
    const data = await seats.find({ FlightID: req.body.FlightID });
    if (c == "Economy") {
        rs = data[0].reservedEcoSeats;
    }
    else if (c == "First") {
        rs = data[0].reservedFstSeats;
    }
    else {
        rs = data[0].reservedBusSeats;
    }
    if (rs == undefined) {
        res.send([]);
    }
    else {
        res.send(rs);
    }
})
app.post("/showFlightReservedSeats", async (req, res) => {
    const data = await seats.find({ FlightID: req.body.FlightID });
    let eco = data[0].reservedEcoSeats;
    let bus = data[0].reservedBusSeats;
    let f = data[0].reservedFstSeats;
    if (f == undefined) {
        f = [];
    }
    if (bus == undefined) {
        bus = [];
    }
    if (eco == undefined) {
        eco = []
    }
    ob = { Economy: eco, Business: bus, First: f };
    res.send(ob);
})

app.post("/showFlightAvailableSeatsNumber", async (req, res) => {
    ob = { Economy: (await getAvailableCabinSeat("Economy", req.body.FlightID)).length, Business: (await getAvailableCabinSeat("Business", req.body.FlightID)).length, First: (await getAvailableCabinSeat("First", req.body.FlightID)).length };
    res.send(ob);
})
app.post("/showFlightAvailableSeats", async (req, res) => {
    ob = { Economy: (await getAvailableCabinSeat("Economy", req.body.FlightID)), Business: (await getAvailableCabinSeat("Business", req.body.FlightID)), First: (await getAvailableCabinSeat("First", req.body.FlightID)) };
    res.send(ob);
})

async function getAvailableCabinSeat(c, id) {
    const data = await seats.find({ FlightID: id });
    if (data.length == 0) {
        s = await getSeatNumbers(id);
        ob = getFlightSeats(s.e, s.b, s.f);
        if (c == "Economy") {
            st = ob.economy;
        }
        else if (c == "First") {
            st = ob.first;
        }
        else {
            st = ob.business;
        }
        return st;
    }
    else {
        s = await getSeatNumbers(id);
        ob = getFlightSeats(s.e, s.b, s.f);
        if (c == "Economy") {
            st = ob.economy;
            rs = data[0].reservedEcoSeats;
        }
        else if (c == "First") {
            st = ob.first;
            rs = data[0].reservedFstSeats;
        }
        else {
            st = ob.business;
            rs = data[0].reservedBusSeats;
        }
        if (rs == undefined) {
            return st;
        }
        for (var i = 0; i < rs.length; i++) {
            if (st.includes(rs[i])) {
                remove(st, rs[i]);
            }
        }
        return st;
    }
}
app.post("/flightSeating", async (req, res) => {
    const query = await flight.find({ _id: req.body._id });
    fst = query[0].NuofAvailableFirstSeats;
    bus = query[0].NuofAvailableBuisnessSeats;
    eco = query[0].NuofAvailableEconomySeats;
    capacity = fst + bus + eco;
    ob = getFlightSeats(eco, bus, fst, req.body_id);
    o = { firstNu: fst, businessNu: bus, economyNu: eco, totalcapacity: capacity }
    re = Object.assign(ob, o);
    res.send(re);
})
app.get("/showReservedSeats", (req, res) => {//shows all the seat reservation database => each flight and its reserved seats
    seats.find({}).exec(function (err, data) {
        res.send(data);
    })
});
app.post("/showFlightReservedSeats", (req, res) => {//shows the reserved seats of a specific flight (all cabin types)
    seats.find({ FlightID: req.body.FlightID }).exec(function (err, data) {
        res.send(data);
    })
})

app.post("/checkSeat", (req, res) => {
    seats.find({ FlightID: req.body.FlightID }).lean().exec(function (err, data) {
        seat = req.body.seat;
        a = data[0].reservedSeats;
        if (a.includes(seat)) {
            res.send("reserved");
        }
        else {
            res.send("not reserved");
        }
    })
})
app.post("/reserveSeats", async (req, res) => {//reserves seats, doesn't make sure it's already in the data
    c = req.body.cabin;
    seats.find({ FlightID: req.body.FlightID }).lean().exec(function (err, data) {
        if (data.length != 0) {
            a = data[0].reservedSeats;
            rSeats = a.concat(req.body.seats);
            if (c == "Economy") {
                if (data[0].reservedEcoSeats != null && data[0].reservedEcoSeats.length != 0) {
                    b = data[0].reservedEcoSeats;
                    bc = b.concat(req.body.seats);
                } else {
                    if (Array.isArray(req.body.seats)) {
                        bc = req.body.seats
                    }
                    else {
                        bc = [req.body.seats];
                    }
                }
                o = { reservedEcoSeats: bc }
            }
            else if (c == "First") {
                if (data[0].reservedFstSeats != null && data[0].reservedFstSeats.length != 0) {
                    b = data[0].reservedFstSeats;
                    bc = b.concat(req.body.seats);
                } else {
                    if (Array.isArray(req.body.seats)) {
                        bc = req.body.seats
                    }
                    else {
                        bc = [req.body.seats];
                    }
                }
                o = { reservedFstSeats: bc };
            }
            else {
                if (data[0].reservedBusSeats != null && data[0].reservedBusSeats.length != 0) {
                    b = data[0].reservedBusSeats; bc = b.concat(req.body.seats);
                } else {
                    if (Array.isArray(req.body.seats)) {
                        bc = req.body.seats
                    }
                    else {
                        bc = [req.body.seats];
                    }
                }
                o = { reservedBusSeats: bc };
            }
            ob = { reservedSeats: rSeats };
            let re = Object.assign(ob, o);
            seats.updateOne({ FlightID: req.body.FlightID }, re).exec(function (err, leads) {
                res.status(201).send(leads);
            });
        }
        else {
            if (Array.isArray(req.body.seats)) {
                bc = req.body.seats
            }
            else {
                bc = [req.body.seats];
            }
            if (c == "Economy") {
                ob = {
                    "FlightID": req.body.FlightID,
                    "reservedSeats": bc,
                    "reservedEcoSeats": bc
                }
            }
            else if (c == "Business") {
                ob = {
                    "FlightID": req.body.FlightID,
                    "reservedSeats": bc,
                    "reservedBusSeats": bc
                }
            }
            else {
                ob = {
                    "FlightID": req.body.FlightID,
                    "reservedSeats": bc,
                    "reservedFstSeats": bc
                }
            }
            const sts = new seats(ob)
            sts.save().then((result) => {

                res.send(result)
            })
                .catch((err) => {
                    console.log(err)
                })

        }

    })
})

app.post("/getPrice", async (req, res) => {//gets price of specific flight, given specific cabin
    const cabin = req.body.cabin;
    const data = await flight.find({ _id: req.body._id });
    if (cabin == "Economy") {
        price = data[0].EcoPrice;
    }
    else if (cabin == "First") {
        price = data[0].FPrice;
    }
    else {
        price = data[0].BusPrice;
    }
    res.send({ price });

})
function calcTotalPrice(price, children, adults) {//cabin price as input per 1 ticket
    a = price * adults;
    b = children * constantData.childPriceRatio * price;
    return a + b;
}

app.post("/getFlightDetails", (req, res) => {//flightNumber, Departure,arrival Time, Trip Duration, Cabin class,baggage allowance
    flight.find({ _id: req.body._id }).lean().exec(function (err, data) {
        c = req.body.cabin;
        if (c == "First") {
            baggage = constantData.bagallowanceFst;
            price = data[0].FPrice;
        }
        else if (c == "Business") {
            baggage = constantData.bagallowanceBus;
            price = data[0].BusPrice;
        }
        else {
            baggage = constantData.bagallowanceEco;
            price = data[0].EcoPrice;
        }
        total = calcTotalPrice(price, req.body.childPass, req.body.adultPass)
        data[0].baggageAllowance = baggage;
        data[0].totalPrice = total;
        data[0].cabin = c;
        data[0].price = price;
        console.log("Data kteer da takdeer"+data);
        res.send(data);
    })
})

function getBaggage(cabin) {
    if (cabin == "First") {
        Baggage = constantData.bagallowanceFst;
    }
    else if (cabin == "Business") {
        Baggage = constantData.bagallowanceBus;
    }
    else {
        Baggage = constantData.bagallowanceEco;
    }
    return Baggage;
}
app.get("/sendUserInfo", (req, res) => {
    existing.find({}).exec(function (err, data) {
        res.send(data);
    })
})
app.post("/editProfile", async (req, res) => {
    found1 = false;
    found = false;
    foundUsername = false;
    msg = "";
    if (req.body.firstName != undefined && typeof req.body.firstName != "string") {
        res.status(403).send("First name has to be a string")
        return;
    }

    if (req.body.middleName != undefined && typeof req.body.middleName != "string") {
        res.status(403).send("Middle name must be a string")
    }
    if (req.body.lastName != undefined && typeof req.body.lastName != "string") {
        res.status(403).send("passport has to be a string")
        return;
    }
    if (req.body.title != undefined && typeof req.body.title != "string") {
        res.status(403).send("Title must be a string")
    }
    if (req.body.dateOfBirth != undefined && typeof req.body.dateOfBirth != date) {
        res.status(403).send("Date of birth must be a date")
    }
    if (req.body.passport != undefined) {
        if (typeof req.body.passport != "string") {
            res.status(403).send("passport has to be a string")
            return;
        }
        else {
            const query = await existing.find({ passport: req.body.passport })
            if (query.length == 0)
                var found = false
            else {
                c = query1[0].passport;
                if (c == req.body._id) {
                    found = false;
                }
                found = true
            }

        }
    }
    else if (req.body.email != undefined) {
        if (typeof req.body.email != "string") {
            res.status(403).send("email has to be a string")
            return;
        }
        else {
            const query1 = await existing.find({ email: req.body.email })
            if (query1.length == 0)
                var found1 = false
            else {
                c = query1[0]._id
                if (c == req.body._id) {
                    found1 = false;
                }
                else {
                    found1 = true
                }
            }
        }
    }

    if (found1) {
        res.status(403).send("This email is already registered")
        //msg = msg.concat("This email is already taken")
    } else if (found) {
        res.status(403).send("This passport number already exists in our database")
        // msg = "This passport number already exists in our database, ";
    }
    else {
        existing.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
            res.status(201).send(leads);
        })
    }

})
app.post("/addReservedFlight", (req, res) => {
    const res1 = new reserved({
        ChosenFlight: req.body.chosenFlightId,
        User: req.body.user
    })
    res1.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})
app.post("/cancelReservation", async (req, res) => {
    const query = await reservations.find({ _id: req.body.reservationId }).populate("User").populate("DepartId").populate("ReturnId");
    reservations.deleteOne({ _id: req.body.reservationId }).exec(function (err, leads) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("reservation cancelled!!")
        }
    });
    if (query.length != 0) {
        res.send(query[0].User.email);
        sub = "Reservation : " + query[0]._id + " cancellation";
        txt = "You have cancelled your reservation with booking number: " + query[0]._id + " successfully!" + "\n";
        dep = query[0].DepartId.FlightNu;
        ret = query[0].ReturnId.FlightNu;
        price = query[0].Total;
        txt += "Your cancelled ticket details: " + "\n";
        txt += "Departure Flight Number: " + dep + "\n";
        txt += "Return Flight Number: " + ret + "\n";
        txt += "Total amount to be refunded: " + price + "\n";
        txt += "The refund has been requestd and will be processed within 14 days." + "\n" + "Thank you for using nowayhome airlines. We're sad to see you cancel!" + "\n" + "nowayhome Airlines";
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'ershacl123@gmail.com',
              pass:'ershacl0'
            }
          });
        var mailOptions = {
            from: 'nowayhomeairlines@gmail.com',
            to: query[0].User.email,
            subject: sub,
            text: txt
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        res.send("err")
    }
});


app.post("/addReservation", (req, res) => {
    const res1 = new reservations({
        'DepartId': req.body.DepartId,
        "DepartPassengersAdult": req.body.departAdult,
        'DepartPassengersChild': req.body.departChild,
        'DepartCabin': req.body.departCabin,
        'DepartSeats': req.body.departSeats,
        'DepartPrice': req.body.departPrice,
        'DepartPriceTotal': req.body.DepartPriceTotal,
        'ReturnId': req.body.ReturnId,
        "ReturnPassengersAdult": req.body.returnAdult,
        'ReturnPassengersChild': req.body.returnChild,
        'ReturnPrice': req.body.returnPrice,
        'ReturnPriceTotal': req.body.returnPriceTotal,
        'ReturnCabin': req.body.returnCabin,
        'ReturnSeats': req.body.returnSeats,
        'User': "61abb8b7dda93117406ba763",
        'Total': req.body.Total

    })
    res1.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
});

app.post("/cancelReservation", async (req, res) => {
    const query = await reservations.find({ _id: req.body.reservationId }).populate("User").populate("DepartId").populate("ReturnId");
    reservations.deleteOne({ _id: req.body.reservationId }).exec(function (err, leads) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("reservation cancelled!!")
        }
    });
    if (query.length != 0) {
        res.send(query[0].User.email);
        sub = "Reservation : " + query[0]._id + " cancellation";
        txt = "You have cancelled your reservation with booking number: " + query[0]._id + " successfully!" + "\n";
        dep = query[0].DepartId.FlightNu;
        ret = query[0].ReturnId.FlightNu;
        price = query[0].Total;
        txt += "Your cancelled ticket details: " + "\n";
        txt += "Departure Flight Number: " + dep + "\n";
        txt += "Return Flight Number: " + ret + "\n";
        txt += "Total amount to be refunded: " + price + "\n";
        txt += "The refund has been requestd and will be processed within 14 days." + "\n" + "Thank you for using nowayhome airlines. We're sad to see you cancel!" + "\n" + "nowayhome Airlines";
        var mailOptions = {
            from: 'nowayhomeairlines@gmail.com',
            to: query[0].User.email,
            subject: sub,
            text: txt
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nowayhomeairlines@gmail.com',
                pass: 'nowayhomefarmers1'
            }
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        res.send("err")
    }
});

app.post("/usersRegister", async (req, res) => {

    const user = await new existing({
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'passport': req.body.passport,
        'email': req.body.email,
        'password': req.body.password
    })

    const takenEmail = await existing.findOne({ email: req.body.email })
    const takenPassport = await existing.findOne({ passport: req.body.passport })
    var schema = new passwordValidator();
    


    if (takenEmail) {

        res.json({ message: "This email already exists in our database. Please use another one" })
    }
    if (takenPassport) {
        res.json({ message: "This passport number already exists in our database. Please use another one." })
    }
    else if ((schema.validate(req.body.password)) == false) {
        res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
    }

    else {
        user.password = await bcrypt.hash(req.body.password, 10)
        const dbUser = new existing({
            username: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            passport: user.passport,
            email: user.email
        })


        if (!(user.email.includes("@")))
            res.json({ message: "This email is not valid" })
        else {
            dbUser.save()
            res.status(201).send("Registered successfully!")
        }
    }

})
app.post("/adminsRegister", async (req, res) => {
    const newAdmin = await new admin({
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'email': req.body.email,
        'password': req.body.password
    })

    const takenEmail = await admin.findOne({ email: req.body.email })
    const takenEmailFromUser = await existing.findOne({ email: req.body.email })

    var schema = new passwordValidator();



    if (takenEmail || takenEmailFromUser) {
        res.json({ message: "This email already exists in our database. Please use another one" })
    }

    else if ((schema.validate(req.body.password)) == false) {
        res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
    }

    else {
        newAdmin.password = await bcrypt.hash(req.body.password, 10)
        const dbAdmin = new admin({
            username: newAdmin.email.split("@")[0],
            password: newAdmin.password,
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            email: newAdmin.email
        })


        if (!(newAdmin.email.includes("@")))
            res.json({ message: "This email is not valid" })



        else {
            dbAdmin.save()
            res.status(201).send("Registered successfully!")
        }
    }

})



app.post("/changeMyPassword", async (req, res) => {

    const myOldPassword = await existing.findOne({ _id: req.body._id })
    const correct = bcrypt.compare(req.body.oldPassword, myOldPassword.password).then(async isMatching => {
        if (isMatching) {
            var schema = new passwordValidator();
          
            if ((schema.validate(req.body.newPassword)) == false) {
                res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
            }
            await existing.updateOne({ _id: req.body._id }, { password: await bcrypt.hash(req.body.newPassword, 10) })
            res.json({ message: "Your password has been successfully updated" })
        }
        else {
            res.json({ message: "Please enter your old password successfully" })
        }
    })





})

app.post("/changeAdminsPassword", async (req, res) => {

    const myOldPassword = await admin.findOne({ _id: req.body._id })
    const correct = bcrypt.compare(req.body.oldPassword, myOldPassword.password).then(async isMatching => {
        if (isMatching) {
            var schema = new passwordValidator();
    
            if ((schema.validate(req.body.newPassword)) == false) {
                res.json({ message: "Your password should contain at least 1 capital letter, 1 digit, and should be at least 8 characters long" })
            }
            await admin.updateOne({ _id: req.body._id }, { password: await bcrypt.hash(req.body.newPassword, 10) })
            res.json({ message: "Your password has been successfully updated" })
        }
        else {
            res.json({ message: "Please enter your old password successfully" })
        }
    })





})

app.post("/flightSeatsInfo", async (req, res) => {
    const query = await flight.find({ _id: req.body._id });
    if (query.length == 0) {
        res.send("flight not found")
    }
    else {
        fst = query[0].NuofAvailableFirstSeats;
        bus = query[0].NuofAvailableBuisnessSeats;
        eco = query[0].NuofAvailableEconomySeats;
        var o = await getReservedSeats(req.body._id);
        if (o == null) {
            o = { Economy: [], Business: [], First: [] }
        }
        ob = await getFlightSeats(eco, bus, fst, req.body_id);
        const e = ob.economy;//array of all eco seats
        const f = ob.first;//array of all first seats
        const b = ob.business; //array of all bus seats
        var c = new Array(e.length);
        var c2 = new Array(b.length);
        var c3 = new Array(f.length);
        for (var i = 0; i < c.length; i++) {
            c[i] = "hi";
        }
        for (var i = 0; i < c2.length; i++) {
            c2[i] = "hi";
        }
        for (var i = 0; i < c3.length; i++) {
            c3[i] = "hi";
        }
        var i = 0;
        for (i; i < e.length; i++) {
            if (o.Economy.includes(e[i]) || req.body.cabin != "Economy") {
                ox = { seat: e[i], res: true };
            }
            else {
                ox = { seat: e[i], res: false };
            }
            c[i] = ox;
        }
        for (var j = 0; j < b.length; j++) {
            if (o.Business.includes(b[j]) || req.body.cabin != "Business") {
                ox = { seat: b[j], res: true };
            }
            else {
                ox = { seat: b[j], res: false };
            }
            c2[j] = ox;

        }
        for (var j = 0; j < f.length; j++) {
            if (o.First.includes(f[j]) || req.body.cabin != "First") {
                ox = { seat: f[j], res: true };
            }
            else {
                ox = { seat: f[j], res: false };
            }
            c3[j] = ox;

        }
        result = { Economy: c, Business: c2, First: c3 };
        res.send(result);
    }
});

async function getReservedSeats(id) {
    const data = await seats.find({ FlightID: id });
    if (data.length == 0) {
        return;
    }
    else {
        let eco = data[0].reservedEcoSeats;
        let bus = data[0].reservedBusSeats;
        let f = data[0].reservedFstSeats;
        if (f == undefined) {
            f = [];
        }
        if (bus == undefined) {
            bus = [];
        }
        if (eco == undefined) {
            eco = []
        }
        ob = { Economy: eco, Business: bus, First: f };
        return ob;
    }
}

app.post("/email", async (req, res) => {
    const q = await reservations.find({ _id: req.body.reservationId }).populate("User").populate("DepartId").populate("ReturnId");
    sub = "Your Itinerary details of reservation: !" + q[0]._id;
    txt = iten(q[0]);
    txt += "We can't wait for you to fly with us!" + "\n" + "Thank you for flying with nowayhome airlines." + "\n" + "nowayhome Airlines";
    var mailOptions = {
        from: 'nowayhomeairlines@gmail.com',
        to: q[0].User.email,
        subject: sub,
        text: txt
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nowayhomeairlines@gmail.com',
            pass: 'nowayhomefarmers1'
        }
    });
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send("done");
})


app.post("/editSeating", async (req, res) => {
    const query = await seats.find({ FlightID: req.body.FlightID });
    const c = req.body.cabin;
    bc = req.body.oldseats;
    bf = req.body.newSeats
    if (query.length == 0) {
        if (c == "Economy") {
            ob = {
                "FlightID": req.body.FlightID,
                "reservedSeats": bc,
                "reservedEcoSeats": bc
            }
        }
        else if (c == "Business") {
            ob = {
                "FlightID": req.body.FlightID,
                "reservedSeats": bc,
                "reservedBusSeats": bc
            }
        }
        else {
            ob = {
                "FlightID": req.body.FlightID,
                "reservedSeats": bc,
                "reservedFstSeats": bc
            }
        }
        const sts = new seats(ob)
        sts.save().then((result) => {

            res.send(result)
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        var x;
        if (c == "Economy") {
            x = query[0].reservedEcoSeats;
        }
        else if (c == "Business") {
            x = query[0].reservedBusSeats;
        }
        else {
            x = query[0].reservedFstSeats;
        }
        z = query[0].reservedSeats;
        for (var i = 0; i < bc.length; i++) {
            x = removeSeat(bc[i], x);
            z = removeSeat(bc[i], z);
        }
        x = x.concat(bf);//reserved seats in cabin
        z = z.concat(bf);//all reserved seats
        if (c == "Economy") {
            ob = { reservedEcoSeats: x, reservedSeats: z }

        }
        else if (c == "Business") {
            ob = { reservedBusSeats: x, reservedSeats: z }
        }
        else {
            ob = { reservedFstSeats: x, reservedSeats: z }
        }
        seats.updateOne({ FlightID: req.body.FlightID }, ob).exec(function (err, leads) {
            res.status(201).send(leads);
        })
    }



})

app.post("/editSeatingRes", async (req, res) => {
    //remove old seats from old flight and add new seats to new flight

    const query = await seats.find({ FlightID: req.body.oldFlight });
    const c = req.body.oldcabin;
    const c2 = req.body.newcabin;
    bc = req.body.oldseats;
    bf = req.body.newSeats
    var x;
    if (c == "Economy") {
        x = query[0].reservedEcoSeats;
    }
    else if (c == "Business") {
        x = query[0].reservedBusSeats;
    }
    else {
        x = query[0].reservedFstSeats;
    }
    z = query[0].reservedSeats;
    for (var i = 0; i < bc.length; i++) {
        x = removeSeat(bc[i], x);
        z = removeSeat(bc[i], z);
    }
    if (c == "Economy") {
        ob = { reservedEcoSeats: x, reservedSeats: z }

    }
    else if (c == "Business") {
        ob = { reservedBusSeats: x, reservedSeats: z }
    }
    else {
        ob = { reservedFstSeats: x, reservedSeats: z }
    }
    seats.updateOne({ FlightID: req.body.oldFlight }, ob).exec(function (err, leads) {
        // res.status(201).send(leads);
    })
    const data = await seats.find({ FlightID: req.body.newFlight });
    if (c2 == "Economy") {
        x = data[0].reservedEcoSeats;
    }
    else if (c2 == "Business") {
        x = data[0].reservedBusSeats;
    }
    else {
        x = data[0].reservedFstSeats;
    }
    z = data[0].reservedSeats;
    x = x.concat(bf);//reserved seats in cabin
    z = z.concat(bf);//all reserved seats
    if (c2 == "Economy") {
        ob = { reservedEcoSeats: x, reservedSeats: z }

    }
    else if (c2 == "Business") {
        ob = { reservedBusSeats: x, reservedSeats: z }
    }
    else {
        ob = { reservedFstSeats: x, reservedSeats: z }
    }
    seats.updateOne({ FlightID: req.body.newFlight }, ob).exec(function (err, leads) {
        // res.status(201).send(leads);
    })
})
function removeSeat(u, ar) {
    const y = ar.filter(function (value, index, arr) {
        return value != u;
    })
    return y;
}
function iten(res) {
    //const res = await summary(ob._id);
    txt = "Pack your bags! Your payment was successful and your ticket reservation is now confirmed! " + "\n";
    dep = res.DepartId;
    ret = res.ReturnId;
    txt += "Your Itinerary: " + "\n" + "\n";
    txt += "Departure Flight: " + "\n" + "\n";
    txt += "Departure Airport: " + dep.From + "\n";
    txt += "Arrival Airport: " + dep.To + "\n";
    txt += "Flight Number: " + dep.FlightNu + "\n";
    txt += "Flight Date: " + dep.FlightDate + "\n";
    txt += "Departure Time: " + dep.DepartureTime + "\n";
    txt += "Arrival Time: " + dep.ArrivalTime + "\n";
    txt += "Ticket Price: " + res.DepartPrice + "\n";
    txt += "Seats: " + res.DepartSeats + "\n" + "\n";
    txt += "Return Flight: " + "\n" + "\n";
    txt += "Departure Airport: " + ret.From + "\n";
    txt += "Arrival Airport: " + ret.To + "\n";
    txt += "Flight Number: " + ret.FlightNu + "\n";
    txt += "Flight Date: " + ret.FlightDate + "\n";
    txt += "Departure Time: " + ret.DepartureTime + "\n";
    txt += "Arrival Time: " + ret.ArrivalTime + "\n";
    txt += "Ticket Price: " + res.ReturnPrice + "\n";
    txt += "Seats: " + res.ReturnSeats + "\n" + "\n";
    txt += "Total Cost: " + res.Total + "\n" + "\n";
    return txt;
}
async function sendEmail(result, product, email) {
    sub = "Reservation : " + product._id + " confirmation!";
    txt = iten(product);
    txt += "We can't wait for you to fly with us!" + "\n" + "Thank you for flying with nowayhome airlines." + "\n" + "nowayhome Airlines";
    var mailOptions = {
        from: 'nowayhomeairlines@gmail.com',
        to: email,
        subject: sub,
        text: txt
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nowayhomeairlines@gmail.com',
            pass: 'nowayhomefarmers1'
        }
    });
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

app.post("/payment", async (req, res) => {

    const { product, token } = req.body;

    const idempotencyKey = uuidv4();//so user wouldn't be charged again
    const email = await getmail(product.user);
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.Total * 100,//must
            currency: 'usd',//must
            customer: customer.id,//must
            receipt_email: token.email,

        }, { idempotencyKey })
    }).then(result => {
        addRes(product, email);
    }).catch(err => console.log(err))


})

async function editRes(resv, email, update, str, val) {
    reservations.updateOne({ _id: resv }, update).then((result) => {
        reservations.find({ _id: resv }).populate("User").populate("DepartId").populate("ReturnId").then((data) => {
            sub = "Reservation : " + resv + " updated!";
            txt = iten(data[0]);
            txt += "\n";
            if (val != 0) {
                txt += "Price difference: " + val + "$ paid successfully"
            }
            else {
                txt += str;
            }

            txt += "\n" + "\n";
            txt += "We can't wait for you to fly with us!" + "\n" + "Thank you for flying with nowayhome airlines." + "\n" + "nowayhome Airlines";
            var mailOptions = {
                from: 'nowayhomeairlines@gmail.com',
                to: email,
                subject: sub,
                text: txt
            };
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nowayhomeairlines@gmail.com',
                    pass: 'nowayhomefarmers1'
                }
            });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }).catch(error => console.log(error));

    }).catch(err => console.log(err));

}
app.post("/editReservation", async (req, res) => {
    const email = await getmail(req.body.user);
    await editRes(req.body.resv, email, req.body.update, req.body.str, req.body.val);
    // reservations.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
    //     res.status(201).send(leads);
    // })
})

async function getmail(id) {
    const data = await existing.find({ _id: id });
    return data[0].email;
}
app.post("/ReservationSummary", (req, res) => {
    reservations.find({ _id: req.body.reservationId }).populate("User").populate("DepartId").populate("ReturnId").then((p) => {
        if (p.length == 0) {
            res.send("flight not found");
            return;
        }
        let c = p[0].DepartCabin;
        departBaggage = getBaggage(c);
        let c2 = p[0].ReturnCabin;
        returnBag = getBaggage(c2);
        p[0] = p[0].toJSON();
        p[0].departureBaggage = departBaggage;
        p[0].returnBaggage = returnBag;
        res.send(p[0]);
    })
})





async function summary(id) {
    const p = await reservations.find({ _id: id }).populate("User").populate("DepartId").populate("ReturnId");
    if (p.length == 0) {
        res.send("flight not found");
        return;
    }
    let c = p[0].DepartCabin;
    departBaggage = getBaggage(c);
    let c2 = p[0].ReturnCabin;
    returnBag = getBaggage(c2);
    p[0] = p[0].toJSON();
    p[0].departureBaggage = departBaggage;
    p[0].returnBaggage = returnBag;
    return p[0];
}

app.post("/viewUsersReservations", async (req, res) => {

    reservations.find({ User: req.body.user }).populate("User").populate("DepartId").populate("ReturnId").then(async (p) => {
        res.send(p);
    })
        .catch(error => console.log(error))
})

function addRes(ob, email) {
    const res1 = new reservations({
        'DepartId': ob.DepartId._id,
        "DepartPassengersAdult": ob.adult,
        'DepartPassengersChild': ob.child,
        'DepartCabin': ob.cabin,
        'DepartSeats': ob.DepartSeats,
        'DepartPrice': ob.DepartPrice,
        'DepartPriceTotal': ob.DepartPriceTotal,
        'ReturnId': ob.ReturnId._id,
        "ReturnPassengersAdult": ob.adult,
        'ReturnPassengersChild': ob.child,
        'ReturnPrice': ob.ReturnPrice,
        'ReturnPriceTotal': ob.returnPriceTotal,
        'ReturnCabin': ob.cabin,
        'ReturnSeats': ob.ReturnSeats,
        'User':  ob.user,
        'Total': ob.Total,


    })
    res1.save().then((result) => {
        sub = "Reservation : " + result._id + " confirmation!";
        txt = iten(ob);
        txt += "We can't wait for you to fly with us!" + "\n" + "Thank you for flying with nowayhome airlines." + "\n" + "nowayhome Airlines";
        var mailOptions = {
            from: 'nowayhomeairlines@gmail.com',
            to: email,
            subject: sub,
            text: txt
        };
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nowayhomeairlines@gmail.com',
                pass: 'nowayhomefarmers1'
            }
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }).catch((err) => {
        console.log(err)
    })
}
app.post("/deleteSeat", async (req, res) => {
    seats.updateOne({ FlightID: req.body._id }, req.body).exec(function (err, leads) {
        res.status(201).send(leads);
    });
})

app.post("/paymentdiff", async (req, res) => {

    const { product, token } = req.body;
    const idempotencyKey = uuidv4();//so user wouldn't be charged again
    const email = await getmail(product.user);
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.Total * 100,//must
            currency: 'usd',//must
            customer: customer.id,//must
            receipt_email: token.email,

        }, { idempotencyKey })
    }).then(result => {
        console.log(result);
    }).catch(err => console.log(err))


})
function editRes(resv, email, update, str, val) {
    reservations.updateOne({ _id: resv }, update).then((result) => {
        reservations.find({ _id: resv }).then((data) => {
            sub = "Reservation : " + resv + " updated!";
            txt = iten(data[0]);
            txt += "\n";
            if (val != 0) {
                txt += "Price difference: " + val + "$ paid successfully"
            }
            else {
                txt += str;
            }

            txt += "\n" + "\n";
            txt += "We can't wait for you to fly with us!" + "\n" + "Thank you for flying with nowayhome airlines." + "\n" + "nowayhome Airlines";
            var mailOptions = {
                from: 'nowayhomeairlines@gmail.com',
                to: email,
                subject: sub,
                text: txt
            };
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nowayhomeairlines@gmail.com',
                    pass: 'nowayhomefarmers1'
                }
            });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }).catch((err) => {
            console.log(err)
        })
    })

}
app.post("/editReservation", async (req, res) => {
    const email = await getmail(req.body.user);
    editRes(req.body.resv, email, req.body.update, req.body.str, req.body.val);
})
app.post("/editSeatingRes", async (req, res) => {
    const query = await seats.find({ FlightID: req.body.oldFlight });
    const c = req.body.oldcabin;
    const c2 = req.body.newcabin;
    bc = req.body.oldseats;
    bf = req.body.newSeats
    var x;
    if (c == "Economy") {
        x = query[0].reservedEcoSeats;
    }
    else if (c == "Business") {
        x = query[0].reservedBusSeats;
    }
    else {
        x = query[0].reservedFstSeats;
    }
    z = query[0].reservedSeats;
    for (var i = 0; i < bc.length; i++) {
        x = removeSeat(bc[i], x);
        z = removeSeat(bc[i], z);
    }
    if (c == "Economy") {
        ob = { reservedEcoSeats: x, reservedSeats: z }

    }
    else if (c == "Business") {
        ob = { reservedBusSeats: x, reservedSeats: z }
    }
    else {
        ob = { reservedFstSeats: x, reservedSeats: z }
    }
    seats.updateOne({ FlightID: req.body.oldFlight }, ob).exec(function (err, leads) {
        res.status(201).send(leads);
    })
    const data = await seats.find({ FlightID: req.body.newFlight });
    if (c2 == "Economy") {
        x = data[0].reservedEcoSeats;
    }
    else if (c2 == "Business") {
        x = data[0].reservedBusSeats;
    }
    else {
        x = data[0].reservedFstSeats;
    }
    z = data[0].reservedSeats;
    x = x.concat(bf);//reserved seats in cabin
    z = z.concat(bf);//all reserved seats
    console.log("Marwan Pablo Yalla Ya negm");
    console.log("Memo Litty")
    if (c2 == "Economy") {
        console.log("Dakhal")
        ob = { reservedEcoSeats: x, reservedSeats: z }

    }
    else if (c2 == "Business") {
        ob = { reservedBusSeats: x, reservedSeats: z }
    }
    else {
        ob = { reservedFstSeats: x, reservedSeats: z }
    }
    console.log(ob);
    seats.updateOne({ FlightID: req.body.newFlight }, ob).exec(function (err, leads) {
        res.status(201).send(leads);
    })
})

app.post("/login", async (req, res) => {
    try{
  const dbUser = await existing.findOne({ username: req.body.username })
       
        if (!dbUser) {
        const dbAdmin =  await admin.findOne({ username: req.body.username })
        console.log(">>>>>>>>>>>>>EL ANA 3ayzo" +dbAdmin);
                if (!dbAdmin)
                    res.status(403).send("This username does not exist")
             const isCorrect = await bcrypt.compare(req.body.password, dbAdmin.password)
                    if (isCorrect) {
                        console.log("correct")
                        const payload = {
                            id: dbAdmin._id,
                            username: dbAdmin.username
                        }

                  const token =  jwt.sign(
                            payload,
                            //process.env.JWT_SECRET
                            "test",
                            { expiresIn: 86400 },
                            (err, token) => {
                                if (err)
                                    return res.json({ message: err })
                              res.status(201).send({
                                    message: "Success",
                                    token: "Bearer " + token,
                                    _id: dbAdmin._id.toString()
                                }
                                )
                                console.log(res)
                                console.log("logged")
                            }
                            
                        )
                        res.status(200).json({"token":token,"user":dbAdmin,"type":"admin"});

                    }
                    else {
                        console.log("inv")
                        return res.status(403).send("Invalid credentials")
                    }
               
            
        }
        else {
    
            bcrypt.compare(req.body.password, dbUser.password).then(isCorrect1 => {
                if (isCorrect1) {
                  
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username
                    }

              const token1 =  jwt.sign(
                        payload,
                        //process.env.JWT_SECRET
                        "test",
                        { expiresIn: 86400 },
                        (err, token1) => {
                            if (err)
                                return res.json({ message: err })
                          res.status(201).send({
                                message: "Success",
                                token1: "Bearer " + token1,
                                _id: dbUSer._id.toString()
                            }
                            )
                            console.log(res)
                            console.log("logged")
                        }
                        
                    )
                    res.status(200).json({"token":token1,"user":dbUser,"type":"user"});

                }
                else {
                    console.log("inv")
                    return res.status(403).send("Invalid credentials")
                }

            })

        }
    
}catch(err){
    console.log(err);
}

}

)