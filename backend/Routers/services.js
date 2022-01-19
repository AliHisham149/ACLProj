const {Router} = require('express');
const servicesRouter = new Router();
const existing = require('./../Models/existingUser.js');
const reservations = require('./../Models/Reservations.js');
var nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51K9xnYIbRPMFvA35UonKXnl680HBGH99mpgoCIrfRdlNt8PDogIMxTZASCoBMOikYA4UYjF0ZjvG2JMmu8wsgnKd00IpWbq57l');
const { v4: uuidv4 } = require('uuid');




servicesRouter.post("/email", async (req, res) => {
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


servicesRouter.post("/paymentdiff", async (req, res) => {

    const { product, token } = req.body;
    console.log("Product", product);
    console.log("Price", product.Total);
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
async function getmail(id) {
    const data = await existing.find({ _id: id });
    return data[0].email;
}
servicesRouter.post("/payment", async (req, res) => {
    const { product, token } = req.body;
    console.log("Product", product);
    console.log("Price", product.Total);
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
        addRes(product, email);
    }).catch(err => console.log(err))
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

module.exports = servicesRouter;
