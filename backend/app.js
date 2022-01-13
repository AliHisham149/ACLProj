//some libs import
const express = require('express'),
mongoose = require('mongoose');
require('dotenv').config(); 
const bodyParser=require('body-parser');
const cors = require('cors');

//idk what's this
var validator  = require('email-validator');
app.use(cors());
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
//end of this 


//models import
const flight = require('./Models/flights.js')
const user = require('./Models/users.js')
const reservation = require('./Models/reservation.js');
const reservation = require('./Models/reservation.js');

//routers import 
const userRouter = require('./routers/userRouter');
const flightRouter = require('./routers/flightRouter');
const reservationsRouter = require('./Routers/ReservationsRouter');



//database init

const uri = "mongodb://ACLTeam:ACLTeam123@cluster0-shard-00-00.o2jpy.mongodb.net:27017,cluster0-shard-00-01.o2jpy.mongodb.net:27017,cluster0-shard-00-02.o2jpy.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4vsmho-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected!!");
});



//app init + adding routers 
app.use(userRouter);
app.use(flightRouter);
app.use(reservationsRouter);
app.use(express.json());
app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(8080, process.env.IP, () => {
    console.log('Server successfully started!');
});

