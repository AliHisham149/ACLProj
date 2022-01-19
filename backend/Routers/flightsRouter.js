const {Router} = require('express');
const flightsRouter = new Router();
const flight = require('../Models/flights.js');

flightsRouter.post("/searchFlights", async (req, res) => {

    const criteria = req.body;
    console.log(req.body);
    try {
        const query = await flight.find(criteria);
        console.log(query);
        console.log("xxxx111");
        res.json(query);

    } catch (err) {
        res.json({ message: err });
    }

});
flightsRouter.get("/showFlights", (req, res) => {
    ``
    flight.find({}).exec(function (err, data) {
        res.send(data)
    })

});
flightsRouter.post("/deleteFlights", (req, res) => {
    flight.deleteOne({ _id: req.body._id }).exec(function (err, leads) {
        res.status(201).send(leads);
    });
});
flightsRouter.post("/updateFlights", (req, res) => {
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

flightsRouter.post("/addFlight", async (req, res) => {
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
    console.log(query2);
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
flightsRouter.post("/getPrice", async (req, res) => {//gets price of specific flight, given specific cabin
    const cabin = req.body.cabin;
    const data = await flight.find({ _id: req.body._id });
    console.log(data);
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

flightsRouter.post("/getFlightDetails", (req, res) => {//flightNumber, Departure,arrival Time, Trip Duration, Cabin class,baggage allowance
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
        res.send(data);
    })
})

function checkFlightDetails(FlightNu, From, To, fstSeats, busSeats, ecoSeats, tdepart, tarrive, arrivalT, departT, ecoPrice, busPrice, Fprice, DepartB, ReturnB, FlightDate) {
    console.log(Number(departT.substring(0, 2)) >= Number(arrivalT.substring(0, 2)));
    console.log(From === To);

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

function calcTotalPrice(price, children, adults) {//cabin price as input per 1 ticket
    a = price * adults;
    b = children * constantData.childPriceRatio * price;
    return a + b;
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

module.exports = flightsRouter;
