const {Router} = require('express');
const reservationsRouter = new Router();

const fs = require('fs');
const chosenFlights = require('./../Models/chosenFlights.js')
const seats = require('./../Models/seats.js')
const existing = require('./../Models/existingUser.js');
const reserved = require('./../Models/reservedFlights.js');
const reservations = require('./../Models/Reservations.js');
const admin = require('./../Models/admins.js')
const flight = require('./../Models/flights.js');
var nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51K9xnYIbRPMFvA35UonKXnl680HBGH99mpgoCIrfRdlNt8PDogIMxTZASCoBMOikYA4UYjF0ZjvG2JMmu8wsgnKd00IpWbq57l');
let boody = {"bagallowanceEco":"23", "bagallowanceBus":"32","bagallowanceFst":"45","childPriceRatio":"0.5"}
let constantData = JSON.parse(boody);
let lolo = {"FirstSeats":["a1","a2","a3","a4","b1","b2","b3","b4","c1","c2","c3","c4","d1","d2","d3","d4"],"BusinessSeats":["e1","e2","e3","e4","e5","e6","f1","f2","f3","f4","f5","f6","g1","g2","g3","g4","g5","g6","h1","h2","h3","h4","h5","h6","i1","i2","i3","i4","i5","i6"] ,"EconomySeats":["j1","j2","j3","j4","j5","j6","j7","j8","k1","k2","k3","k4","k5","k6","k7","k8","l1","l2","l3","l4","l5","l6","l7","l8","m1","m2","m3","m4","m5","m6","m7","m8","n1","n2","n3","n4","n5","n6","n7","n8","o1","o2","o3","o4","o5","o6","o7","o8","p1","p2","p3","p4","p5","p6","p7","p8","q1","q2","q3","q4","q5","q6","q7","q8"]}
let seatsChart = JSON.parse(lolo);
const passwordValidator = require('password-validator');

reservationsRouter.post("/showFlightReservedSeats", async (req, res) => {
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

reservationsRouter.post("/cancelReservation", async (req, res) => {
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



reservationsRouter.post("/addReservation", (req, res) => {
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

reservationsRouter.post("/cancelReservation", async (req, res) => {
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


reservationsRouter.post("/flightSeatsInfo", async (req, res) => {
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
        console.log("xx");
        res.send(result);
    }
});



async function getReservedSeats(id) {
    const data = await seats.find({ FlightID: id });
    if (data.length == 0) {
        console.log("no reservations");
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
        console.log(ob);
        return ob;
    }
}


reservationsRouter.post("/editReservation", async (req, res) => {
    const email = await getmail(req.body.user);
    editRes(req.body.resv, email, req.body.update, req.body.str, req.body.val);
    // reservations.updateOne({ _id: req.body._id }, req.body).exec(function (err, leads) {
    //     res.status(201).send(leads);
    // })
})
reservationsRouter.post("/editSeatingRes", async (req, res) => {
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
    console.log(x);
    z = query[0].reservedSeats;
    console.log(z)
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
    console.log(x);
    z = data[0].reservedSeats;
    x = x.concat(bf);//reserved seats in cabin
    z = z.concat(bf);//all reserved seats
    console.log(x);
    console.log(z)
    if (c2 == "Economy") {
        console.log("changing")
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

reservationsRouter.post("/viewUsersReservations", async (req, res) => {

    reservations.find({ User: req.body.user }).populate("User").populate("DepartId").populate("ReturnId").then(async (p) => {
        console.log(p);//p returns array of user's reservations
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


async function getmail(id) {
    const data = await existing.find({ _id: id });
    return data[0].email;
}
reservationsRouter.post("/ReservationSummary", (req, res) => {
    reservations.find({ _id: req.body.reservationId }).populate("User").populate("DepartId").populate("ReturnId").then((p) => {
        console.log(p);
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
    console.log(p);
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


reservationsRouter.post("/deleteSeat", async (req, res) => {
    seats.updateOne({ FlightID: req.body._id }, req.body).exec(function (err, leads) {
        res.status(201).send(leads);
    });
})

reservationsRouter.post("/editReservation", async (req, res) => {
    const email = await getmail(req.body.user);
    await editRes(req.body.resv, email, req.body.update, req.body.str, req.body.val);
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

async function sendEmail(result, product, email) {
    console.log("then");
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

reservationsRouter.post("/editSeatingRes", async (req, res) => {
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
    console.log(x);
    z = query[0].reservedSeats;
    console.log(z)
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
    console.log(x);
    z = data[0].reservedSeats;
    x = x.concat(bf);//reserved seats in cabin
    z = z.concat(bf);//all reserved seats
    console.log(x);
    console.log(z)
    if (c2 == "Economy") {
        console.log("changing")
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
        // res.status(201).send(leads);
    })
})
reservationsRouter.post("/reserveSeats", async (req, res) => {//reserves seats, doesn't make sure it's already in the data
    c = req.body.cabin;
    seats.find({ FlightID: req.body.FlightID }).lean().exec(function (err, data) {
        if (data.length != 0) {
            a = data[0].reservedSeats;
            rSeats = a.concat(req.body.seats);
            if (c == "Economy") {
                if (data[0].reservedEcoSeats != null && data[0].reservedEcoSeats.length != 0) {
                    b = data[0].reservedEcoSeats;
                    console.log(data[0].reservedEcoSeats)
                    bc = b.concat(req.body.seats);
                    console.log(bc);
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
                        console.log(Array.isArray(req.body.seats));
                        console.log(req.body.seats);
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
                console.log("updated");
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
                console.log(req.body.seats);
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

reservationsRouter.post("/getAvailableCabinSeats", async (req, res) => {
    getAvailableCabinSeat(req.body.cabin, req.body.FlightID).then((result) => {
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })
})
reservationsRouter.post("/showReservedCabinSeats", async (req, res) => {
    let c = req.body.cabin;
    const data = await seats.find({ FlightID: req.body.FlightID });
    console.log(data);
    if (c == "Economy") {
        rs = data[0].reservedEcoSeats;
    }
    else if (c == "First") {
        rs = data[0].reservedFstSeats;
    }
    else {
        rs = data[0].reservedBusSeats;
    }
    console.log(rs);
    if (rs == undefined) {
        res.send([]);
    }
    else {
        res.send(rs);
    }
})

reservationsRouter.post("/showFlightAvailableSeatsNumber", async (req, res) => {
    ob = { Economy: (await getAvailableCabinSeat("Economy", req.body.FlightID)).length, Business: (await getAvailableCabinSeat("Business", req.body.FlightID)).length, First: (await getAvailableCabinSeat("First", req.body.FlightID)).length };
    res.send(ob);
})
reservationsRouter.post("/showFlightAvailableSeats", async (req, res) => {
    ob = { Economy: (await getAvailableCabinSeat("Economy", req.body.FlightID)), Business: (await getAvailableCabinSeat("Business", req.body.FlightID)), First: (await getAvailableCabinSeat("First", req.body.FlightID)) };
    res.send(ob);
})

async function getAvailableCabinSeat(c, id) {
    const data = await seats.find({ FlightID: id });
    if (data.length == 0) {
        s = await getSeatNumbers(id);
        console.log(s);
        ob = getFlightSeats(s.e, s.b, s.f);
        console.log(ob);
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
        console.log(data);
        s = await getSeatNumbers(id);
        console.log(s);
        ob = getFlightSeats(s.e, s.b, s.f);
        console.log(ob);
        if (c == "Economy") {
            st = ob.economy;
            rs = data[0].reservedEcoSeats;
            console.log("reserved seats are " + rs);
        }
        else if (c == "First") {
            st = ob.first;
            rs = data[0].reservedFstSeats;
        }
        else {
            st = ob.business;
            rs = data[0].reservedBusSeats;
        }
        console.log(st)
        console.log(rs);
        if (rs == undefined) {
            return st;
        }
        for (var i = 0; i < rs.length; i++) {
            if (st.includes(rs[i])) {
                remove(st, rs[i]);
            }
        }
        console.log(st);
        return st;
    }
}
reservationsRouter.post("/flightSeating", async (req, res) => {
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
reservationsRouter.get("/showReservedSeats", (req, res) => {//shows all the seat reservation database => each flight and its reserved seats
    seats.find({}).exec(function (err, data) {
        res.send(data);
    })
});
reservationsRouter.post("/showFlightReservedSeats", (req, res) => {//shows the reserved seats of a specific flight (all cabin types)
    seats.find({ FlightID: req.body.FlightID }).exec(function (err, data) {
        res.send(data);
    })
})

reservationsRouter.post("/checkSeat", (req, res) => {
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


function removeSeat(u, ar) {
    const y = ar.filter(function (value, index, arr) {
        return value != u;
    })
    console.log(y);
    return y;
}


reservationsRouter.post("/editSeating", async (req, res) => {
    const query = await seats.find({ FlightID: req.body.FlightID });
    const c = req.body.cabin;
    bc = req.body.oldseats;
    bf = req.body.newSeats
    if (query.length == 0) {
        if (c == "Economy") {
            console.log(req.body.seats);
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
        console.log(x);
        z = query[0].reservedSeats;
        console.log(z)
        for (var i = 0; i < bc.length; i++) {
            x = removeSeat(bc[i], x);
            z = removeSeat(bc[i], z);
        }
        console.log(x);
        console.log(z)
        x = x.concat(bf);//reserved seats in cabin
        z = z.concat(bf);//all reserved seats
        console.log(x);
        console.log(z)
        if (c == "Economy") {
            console.log("changing")
            ob = { reservedEcoSeats: x, reservedSeats: z }

        }
        else if (c == "Business") {
            ob = { reservedBusSeats: x, reservedSeats: z }
        }
        else {
            ob = { reservedFstSeats: x, reservedSeats: z }
        }
        console.log(ob);
        seats.updateOne({ FlightID: req.body.FlightID }, ob).exec(function (err, leads) {
            res.status(201).send(leads);
        })
    }
})

async function getReservedSeats(id) {
    const data = await seats.find({ FlightID: id });
    if (data.length == 0) {
        console.log("no reservations");
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
        console.log(ob);
        return ob;
    }
}


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
function calcTotalPrice(price, children, adults) {//cabin price as input per 1 ticket
    a = price * adults;
    b = children * constantData.childPriceRatio * price;
    return a + b;
}

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

reservationsRouter.post("/AddDepartureFlight", (req, res) => {
    const newFlight = new chosenFlights({
        'DepartId': req.body.FlightId,
        "DepartPassengersAdult": req.body.adultPass,
        'DepartPassengersChild': req.body.childPass,
        'DepartCabin': req.body.cabin
    })
    newFlight.save().then((result) => {
        console.log(result);
        chosenFlights.find({ _id: result._id }).populate("DepartId").then((p) => {
            console.log(p);
            let c = req.body.cabin;
            let total = req.body.adultPass + req.body.childPass;
            if (c == "Economy") {
                ticket = p[0].DepartId.EcoPrice;
            }
            else if (c == "Business") {
                ticket = p[0].DepartId.BusPrice;
            }
            else {
                ticket = p[0].DepartId.FPrice;
            }
            ticketT = (req.body.adultPass * ticket) + (req.body.childPass * ticket * constantData.childPriceRatio);
            chosenFlights.updateOne({ _id: result._id }, { DepartPrice: ticket, DepartPriceTotal: ticketT }).exec(function (err, q) {
                console.log("prices updated");
            })

        }).catch(error => console.log(error));
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })

});


reservationsRouter.post("/searchReturnFlights", async (req, res) => {

    const criteria = { From: req.body.From, To: req.body.To, FlightDate: req.body.departureDate, ReturnBool: true };
    let c = req.body.cabin;
    let total = req.body.adults + req.body.child;
    try {
        const fquery = await flight.find(criteria);//result set is query
        //sends each one as an object in an array
        console.log(fquery);//print 1
        let r = [];
        for (var i = 0; i < fquery.length; i++) {
            let f = fquery[i]._id;
            console.log(f);//print 2
            const squery = await seats.find({ FlightID: f });
            console.log(squery);
            let cond = squery.length == 0;//if flight has no reserved seats yet
            console.log(cond);
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
                console.log(c2);
                if (!c2) {
                    r.push(fquery[i]);
                }
            }
            else {
                r.push(fquery[i]);
            }
        }
        console.log(fquery);
        console.log("xxxx111");
        console.log(r);
        let re = [];
        for (var i = 0; i < r.length; i++) {
            x = r[i];
            x = x.toJSON();
            console.log(x);
            if (c == "Economy") {
                p = x.EcoPrice;
            }
            else if (c == "Business") {
                p = x.BusPrice;
            }
            else {
                p = x.FPrice;
            }
            console.log(p);
            delete x.EcoPrice;
            delete x.BusPrice;
            delete x.FPrice;
            console.log(x);
            x.price = p;
            console.log(x);
            re.push(x);
        }
        console.log(re);
        res.json(re);
    } catch (err) {
        res.json({ message: err });
    }

});


reservationsRouter.post("/searchDepartureFlights", async (req, res) => {
    const criteria = { From: req.body.From, To: req.body.To, FlightDate: req.body.departureDate, DepartBool: true };
    let c = req.body.cabin;
    let total = req.body.adults + req.body.child;
    try {
        const fquery = await flight.find(criteria);//result set is query
        //sends each one as an object in an array
        console.log(fquery);//print 1
        let r = [];
        for (var i = 0; i < fquery.length; i++) {
            let f = fquery[i]._id;
            console.log(f);//print 2
            const squery = await seats.find({ FlightID: f });
            console.log(squery);
            let cond = squery.length == 0;//if flight has no reserved seats yet
            console.log(cond);
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
                console.log(c2);
                if (!c2) {
                    r.push(fquery[i]);
                }
            }
            else {
                r.push(fquery[i]);
            }
        }
        console.log(fquery);
        console.log("xxxx111");
        console.log(r);
        let re = [];
        for (var i = 0; i < r.length; i++) {
            x = r[i];
            x = x.toJSON();
            console.log(x);
            if (c == "Economy") {
                p = x.EcoPrice;
            }
            else if (c == "Business") {
                p = x.BusPrice;
            }
            else {
                p = x.FPrice;
            }
            console.log(p);
            delete x.EcoPrice;
            delete x.BusPrice;
            delete x.FPrice;
            console.log(x);
            x.price = p;
            console.log(x);
            re.push(x);
        }
        console.log(re);
        res.json(re);
    } catch (err) {
        res.json({ message: err });
    }
});



reservationsRouter.post("/AddReturnFlight", async (req, res) => {//places chosen return flight into db
    const cf = await chosenFlights.updateOne({ _id: req.body._id }, {
        'ReturnId': req.body.FlightId,
        "ReturnPassengersAdult": req.body.adultPass,
        'ReturnPassengersChild': req.body.childPass,
        'ReturnCabin': req.body.cabin,

    })
    console.log(cf);
    chosenFlights.find({ _id: req.body._id }).populate("ReturnId").populate("DepartId").then(async (p) => {
        console.log(p);
        let c = req.body.cabin;
        let total = req.body.adultPass + req.body.childPass;
        if (c == "Economy") {
            ticket = p[0].ReturnId.EcoPrice;
        }
        else if (c == "Business") {
            ticket = p[0].ReturnId.BusPrice;
        }
        else {
            ticket = p[0].ReturnId.FPrice;
        }
        ticketT = (req.body.adultPass * ticket) + (req.body.childPass * ticket * constantData.childPriceRatio);
        sub = ticket + p[0].DepartPrice;
        total = ticketT + p[0].DepartPriceTotal;
        const q = await chosenFlights.updateOne({ _id: req.body._id }, { ReturnPrice: ticket, ReturnPriceTotal: ticketT, SubTotal: sub, Total: total });
        res.send(p);
    }).catch(error => console.log(error));

});

module.exports = reservationsRouter;
