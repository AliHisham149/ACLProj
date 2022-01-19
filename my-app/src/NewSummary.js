import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import CardActions from "@material-ui/core/CardActions";
import { FaPlaneDeparture } from "react-icons/fa"
import { FaPlaneArrival } from "react-icons/fa"
import { IconContext } from "react-icons"
import flight from "./images/flight.png"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ImArrowRight2 } from "react-icons/im";
// import {ImArrowRight} from "react-icons/Im"
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Alert from "@mui/material/Alert";
import Confirm from './Confirm'
import { useNavigate, useLocation } from 'react-router-dom'
import { set, setISODay } from "date-fns";
import StripeCheckout from "react-stripe-checkout"
function NewSummary(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { flight, cab, adult, child, seats, reservation, price, dep, tprice, total } = location.state;
    const id= localStorage.getItem("id");
    const [paymentClicked, setPaymentClicked] = useState(false);
    function pr(u) {
        if (cab == "Economy") {
            return u.EcoPrice;
        }

        else if (cab == "Business") {
            return u.BusPrice;
        }
        else {
            return u.FPrice;
        }
    }
    function tot(u) {
        var prc = pr(u);
        return (prc * adult + prc * child * 0.5)
    }
    const [res, setRes] = useState({});
    const [set, setSet] = useState({});
    useEffect(() => {
        if (dep) {
            setRes({
                DepartId: flight._id,
                DepartPassengersAdult: adult,
                DepartPassengersChild: child,
                DepartCabin: cab,
                DepartSeats: seats,
                DepartPrice: pr(flight),
                DepartPriceTotal: tot(flight),
            });
            setSet({
                oldFlight:reservation.DepartId,
                newFlight:flight._id,
                oldseats:reservation.DepartSeats,
                newSeats:seats,
                oldcabin:reservation.DepartCabin,
                newcabin:cab
            })
        }
        else {
            setRes({
                ReturnId: flight._id,
                ReturnPassengersAdult: adult,
                ReturnPassengersChild: child,
                ReturnCabin: cab,
                ReturnSeats: seats,
                ReturnPrice: pr(flight),
                ReturnPriceTotal: tot(flight),
            })
            setSet({
                oldFlight:reservation.ReturnId,
                newFlight:flight._id,
                oldseats:reservation.ReturnSeats,
                newSeats:seats,
                oldcabin:reservation.ReturnCabin,
                newcabin:cab
            })
        }
    },[])
  
    const [flight1,setFlight1] = useState({ flightDate: flight.FlightDate, from: flight.From, to: flight.To, arr: flight.ArrivalTime, dep: flight.DepartureTime, passA: adult, ChildA: child, price: pr(flight), cabin: cab, seat: seats, total: tot(flight) });
    const [product, setProduct] = useState({Total: (tot(flight) - tprice), user: id, update: res, resv: reservation });
    const [pay, setPay]=useState(false);
    const [str, setStr]=useState("");

    useEffect(() => {
        var t= tot(flight);
        if (t == tprice) {
            setPay(false);
           
            setStr("No difference in total price");
            setPaymentClicked(true);
        }
        else if (t < tprice) {//check if new total also <old total
            //refund tprice-t
            setPay(false);
             setStr(" The transfer will process within 14 days.")
             setPaymentClicked(true);
        }
        else {
            setPay(true);
            // setStr( "Price difference to be paid: " + t - tprice + "$");
            setPaymentClicked(false);
        }
    },[])
    function onClickConfirm(){
        axios.post('http://localhost:8080/editSeatingRes',set).then(result => {console.log("seating updated")}).catch(err => console.log(err));
        var val=0;
        if(pay){
            val = tot(flight)-tprice;
        }
        axios.post('http://localhost:8080/editReservation',{resv:
        reservation._id,
        user:"61abb8b7dda93117406ba763",
        update:res,
        str:str,
        val :val
    })
        .then(result => {console.log("reservations updated")}).catch(err => console.log(err));
        navigate("/ReservedFlights",{state: {id:id}});
    }
    const payment = token => {
        const body = {
            token, product
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`http://localhost:8080/paymentdiff`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("Response", response)
            const { status } = response;
            console.log("Status", status);

        }).catch(error => console.log(error))
    }

    return (

        <div style={{ marginTop: 800,marginLeft:-230 }}>

            <div>



                <Typography
                    style={{ fontSize: 50, fontWeight: "bold", color: ' white', marginTop: 200 }}
                    color="textPrimary"
                    align="left"
                    gutterBottom
                >
                    YOUR BOOKING
                </Typography>


                <br />
                <Card
                    style={{
                        width: 1000,
                        height: 700,
                        marginLeft: 250,
                        backgroundColor: "white", marginTop: -500, opacity: 0.9
                    }}
                >
                    <CardContent>
                        <Card
                            style={{
                                marginLeft: 80,
                                width: 800,
                                height: 70,
                                backgroundColor: "#EBECF0", opacity: 0.9
                            }}
                        >
                            <CardContent>
                                <Typography
                                    style={{ fontWeight: "bold", color: ' #161342', marginLeft: 30 }}
                                    color="textPrimary"
                                    align="center"
                                    variant="h4"
                                    component="h2"
                                    gutterBottom

                                >
                                    Your new flight
                                </Typography>
                            </CardContent>
                        </Card>
                        <br />
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8}>
                                <Card
                                    style={{
                                        width: 400,
                                        height: 340,
                                        backgroundColor: "#EBECF0",
                                        opacity: 0.9,
                                        marginLeft: 300, marginTop: 30

                                    }}

                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 30, color: ' #161342' }}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            <FaPlaneDeparture />
                                        </Typography>

                                        <Typography
                                            align="center"
                                            style={{ fontWeight: "bold", color: ' #161342', fontSize: 25, marginTop: -45 }}

                                            component="h2"
                                        >
                                            {flight1.from} <ImArrowRight2 />  {flight1.to}
                                        </Typography>



                                        <Typography
                                            align="left"
                                            style={{ fontSize: 20, fontWeight: "bold", color: ' #161342' }}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            Flight Date :  <Typography style={{ fontSize: 16, color: ' #161342', marginLeft: 120, marginTop: -23 }}> {flight1.flightDate} </Typography>
                                        </Typography>
                                        <Typography
                                            align="left"
                                            style={{ fontSize: 20, fontWeight: "bold", color: ' #161342' }}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            Departure At:  <Typography style={{ fontSize: 16, color: ' #161342', marginLeft: 150, marginTop: -25 }}> {flight1.dep}</Typography>
                                        </Typography>

                                        <Typography
                                            align="left"
                                            style={{ fontSize: 20, fontWeight: "bold", color: ' #161342' }}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            Arrival At:   <Typography style={{ fontSize: 16, color: ' #161342', marginLeft: 120, marginTop: -25 }}>  {flight1.arr}</Typography>
                                        </Typography>
                                        <Typography
                                            align="left"
                                            style={{ fontSize: 20, fontWeight: "bold", color: ' #161342' }}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            Class: <Typography style={{ fontSize: 16, color: ' #161342', marginLeft: 90, marginTop: -25 }}>  {flight1.cabin}</Typography>
                                        </Typography>
                                        <Typography
                                            align="left"
                                            style={{ fontSize: 20, fontWeight: "bold", color: ' #161342' }}
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            Seat: <Typography style={{ fontSize: 16, color: ' #161342', marginLeft: 70, marginTop: -25 }}>  {flight1.seat} </Typography>
                                        </Typography>


                                        <Typography
                                            style={{ fontSize: 30, fontWeight: "bold", color: ' #161342', marginLeft: -70 }}
                                            align="center"
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            $  <Typography style={{ fontSize: 20, color: ' #161342', marginLeft: 60, marginTop: -37 }}> {flight1.price}</Typography>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <br /> <br /><br /><br />
                        </Grid>

                        <br />
                        <br />
                        <br />

                        <Card
                            style={{

                                width: 330,
                                height: 65,
                                backgroundColor: "#EBECF0",
                                opacity: 0.9, marginLeft: 320
                            }}
                        >
                            <CardContent>
                                <Typography
                                    align="left"
                                    style={{ fontSize: 20, fontWeight: "bold", color: ' #161342', marginLeft: 70 }}
                                    color="textPrimary"
                                    gutterBottom
                                >
                                    Total Price  $ {tot(flight)}
                                </Typography>
                            </CardContent>
                        </Card>


                        <Stack spacing={2} sx={{ width: '20' }}>
                            <div style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                marginleft: -30
                            }}>
                                <Typography style={{ color: '#161342', fontweight: 'bold' }}>
                                    {str}
                              </Typography>
               <StripeCheckout
                                    stripeKey="pk_test_51K9xnYIbRPMFvA35ITziFtr9RWYlynAuPJvHhEN0K5cvXSD3xXilXy0ZboHC69mi3bGzh387NCkeGXakoE6kYdPG00lwSZDvyD"
                                    // {process.env.REACT_APP_KEY}
                                    token={payment}
                                    name="Book ticket"
                                    amount={(tot(flight) - tprice) * 100}
                                >
                                    <Button style={{ background: '#161342', fontWeight: "bold", marginLeft: 370,marginTop:10,width:250, color:"white" }} disabled={pay?false:true}variant="contained" color="primary" onClick={Confirm} onClick={() => setPaymentClicked(true)}>
                                        Pay Difference {(tot(flight) - tprice)}$
                                    </Button>

                                </StripeCheckout>
                            </div>
                        </Stack>
                        <Button style={{ background: '#161342', fontWeight: "bold", marginLeft: 700, marginTop: -60, width: 250,color:"white" }} variant="contained" color="primary" disabled={paymentClicked ? false : true} onClick={(event) => onClickConfirm()} >
                            Confirm
                        </Button>
                        <br />
                        <br />
                        <br />
                    </CardContent>
                </Card>
                <br />
                <br />
                <br />
            </div>


        </div>
    )

}
export default NewSummary;