import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import flight from "./images/flight.png"
import { FaPlaneDeparture } from "react-icons/fa"
import { FaPlaneArrival } from "react-icons/fa"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { ImArrowRight2 } from "react-icons/im";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GiCommercialAirplane } from 'react-icons/gi';
import { Button } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import App from './App';
function Flightitinerary(props) {
    // const total = (props.flightA.price * seatsA.length()) + (props.flightB.price * seatsB.length());
    // const retPrice = props.flightB.price;
    const depPrice = props.flightA.price;
    const seatsA = props.seatsA;
    const seatsB = props.seatsB;
    const From = props.flightA.From;
    const to = props.flightA.To;
    const dateA = props.flightA.FlightDate;
    const dateB = props.flightB.FlightDate;

    const arrTerminalA = props.flightA.TerminalArrival;
    const depTerminalA = props.flightA.TerminalDeparture;
    const arrTerminalB = props.flightB.TerminalArrival
    const depTerminalB = props.flightB.TerminalDeparture;
    const durationA = props.flightA.Trip_Duration;
    const durationB = props.flightB.Trip_Duration;
    const cabin = props.cabin
    const fnumberA = props.flightA.FNu;
    const fnumberB = props.flightB.FNu;
    const arrTimeFA = props.flightA.ArrivalTime;
    const depTimeFA = props.flightA.DepartureTime;
    const arrTimeFB = props.flightB.ArrivalTime;
    const depTimeFB = props.flightB.DepartureTime;
    const [confirmClicked, setConfirmClicked] = useState(false);
    const [cancelClicked, setCancelClicked] = useState(false);
    const [openPopUp, setOpen] = useState(false);
    const [resID, setResID] = useState("");
    const handleClickOpenPopUp = () => {
        setOpen(true);
    };

    const handleClosePopUp = () => {
        setOpen(false);
    };

    useEffect(() => {

        axios.post('http://localhost:8080/addReservation', {

            DepartId: props.flightA._id,
            ReturnId: props.flightB._id,
            departCabin: props.cabin,
            departSeats: props.seatsA,
            returnSeats: props.seatsB,
            Total: (props.flightA.price * props.seatsA.length) + (props.flightB.price * props.seatsB.length)

            //  {_id:"61abb8b7dda93117406ba763"}
        }).then(res => {
            // setInfo(res.data);
            console.log(res.data)
            console.log("xxxx");
            setResID(res.data._id)
            console.log(res.data._id)

            console.log(resID)



        })

    }




        , [])




    return (

        <div>
            {confirmClicked ? <App /> : <div style={{}}>

                <Card style={{
                    width: 1000,
                    height: 800,
                    backgroundColor: "#DBE2EF",
                    opacity: 0.87,
                    marginTop: 300
                }}>
                    <CardContent>

                        <Typography
                            style={{ fontSize: 30, fontWeight: "bold" }}
                            color="textPrimary"
                            align="left"
                            gutterBottom
                        >
                            FLIGHT ITINERARY
                        </Typography>


                        <hr />
                        <Typography
                            align="left"
                            style={{ fontSize: 20, fontWeight: 'bold' }}
                            variant="h4" component="h2">
                            BOOKING NUMBER : 99625
                        </Typography>

                        <hr />
                        <Typography
                            align="left"
                            style={{ fontSize: 27 }}
                            color="textPrimary"
                            gutterBottom
                        >
                            <FaPlaneDeparture /> departure flight
                        </Typography>



                        <Grid container spacing={2} style={{ marginTop: -100 }}>
                            <Grid item xs={8}>
                                <Card
                                    style={{
                                        width: 600,
                                        height: 60,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 30, fontWeight: "bold", marginLeft: 100 }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            {From}< ImArrowRight2 /> {to}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={2}>
                                <Card
                                    style={{
                                        width: 200,
                                        height: 90,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="center"
                                            gutterBottom
                                        >
                                            price :
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 30, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="center"
                                            gutterBottom
                                        >
                                            EGP
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card
                                    style={{
                                        width: 300,
                                        height: 200,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>

                                        <Typography
                                            style={{ fontSize: 25, fontWeight: "bold", marginTop: 10 }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Duration: {durationA}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>


                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Class: {cabin}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>

                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Seat: {seatsA}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Status:
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                            confirmed
                                        </Typography>



                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={8}>
                                <Card
                                    style={{
                                        width: 350,
                                        height: 230,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Arriving At: {arrTimeFA}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 25, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Arrival terminal:  {arrTerminalA}
                                        </Typography>

                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                        </Typography>
                                        <br />
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Departuring At: {depTimeFA}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Departure terminal:  {depTerminalA}
                                        </Typography>



                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <hr />



                    <div style={{ marginLeft: 15 }}>
                        <Typography
                            align="left"
                            style={{ fontSize: 27 }}
                            color="textPrimary"
                            gutterBottom
                        >
                            <FaPlaneArrival /> return flight
                        </Typography>
                        <Typography
                            align="left"
                            style={{ fontSize: 27 }}
                            color="textPrimary"
                            gutterBottom
                        >
                            Return: {dateB}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Card
                                    style={{
                                        width: 800,
                                        height: 30,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 30, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            {to} < ImArrowRight2 /> {From}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card
                                    style={{
                                        width: 400,
                                        height: 108,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 20, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="center"
                                            gutterBottom
                                        >
                                            price :
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 40, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="center"
                                            gutterBottom
                                        >
                                            EGP
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card
                                    style={{
                                        width: 300,
                                        height: 300,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 35, fontWeight: "bold", marginTop: -10 }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            BSB Airways
                                        </Typography>

                                        <Typography
                                            style={{ fontSize: 25, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Duration: {durationB}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>


                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Class: {cabin}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>

                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Seat: {seatsB}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Status:
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                            confirmed
                                        </Typography>



                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={8}>
                                <Card
                                    style={{
                                        width: 350,
                                        height: 400,
                                        backgroundColor: "#EBECF0"
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Arriving At: {arrTimeFB}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 25, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>

                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                        </Typography>
                                        <br />
                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >
                                            Departuring At: {depTimeFB}
                                        </Typography>
                                        <Typography
                                            style={{ fontSize: 25, fontWeight: "bold" }}
                                            color="textPrimary"
                                            align="left"
                                            gutterBottom
                                        >

                                        </Typography>

                                        <Typography
                                            style={{ fontSize: 16, fontWeight: "bold" }}
                                            color="textSecondary"
                                            align="left"
                                            gutterBottom
                                        >
                                        </Typography>


                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Card
                            style={{

                                width: 330,
                                height: 65,
                                backgroundColor: "#EBECF0",
                                opacity: 0.7
                            }}
                        >
                            <CardContent>
                                <Typography
                                    align="left"
                                    style={{ fontSize: 20, fontWeight: "bold" }}
                                    color="textPrimary"
                                    gutterBottom
                                >
                                    Total Price  :
                                </Typography>
                            </CardContent>
                        </Card>

                    </div>
                    <hr />

                </Card>

                <Button variant="outlined" onClick={(event) => { setConfirmClicked(true) }}>Confirm</Button>
                <Button variant="outlined" onClick={e => {
                    handleClickOpenPopUp();
                }}>
                    Cancel flight

                </Button>
                <Dialog
                    open={openPopUp}

                    onClose={handleClosePopUp}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to cancel your ticket?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleClosePopUp}>Cancel</Button>
                        <Button onClick={e => {
                            axios.post("http://localhost:8080/cancelReservation",
                                {

                                    reservationId: resID


                                }).then(res => {
                                    // console.log(res.data)
                                    // console.log('alo');
                                    // console.log(u.id)


                                }, [])
                        }} autoFocus>
                            Send a confirmation email
                        </Button>
                    </DialogActions>
                </Dialog>





            </div>}
        </div >
    )
}

export default Flightitinerary;