import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import UpdateFlight from './UpdateFlight';
import DeleteFlight from './DeleteFlight';
import {Popup} from 'reactjs-popup';
import Paper from '@mui/material/Paper';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useNavigate} from "react-router-dom";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Summary2(){
    let navigate=useNavigate();
    let F=localStorage.getItem("flight");
    const Flight= JSON.parse(F);
    const flightno= Flight.FlightNumber;
    const arrivaltime=Flight.ArrivalTime;
    const departuretime=Flight.DepartureTime;
    const bcsc=Flight.BusinessClassSeatsCount;
    const ecsc=Flight.EconomyClassSeatsCount;
    const fcsc= Flight.FirstClassSeatsCount;
    const FD= Flight.FlightDate;
    const from=Flight.From;
    const to= Flight.To;
    const arrivalterminal= Flight.TerminalArrival;
    const departureterminal= Flight.TerminalDeparture;
    const FCost = Flight.FlightCost;



    let RF=localStorage.getItem("ReturnFlight");
    const RFlight= JSON.parse(RF);
    const Rflightno= RFlight.FlightNumber;
    const Rarrivaltime=RFlight.ArrivalTime;
    const Rdeparturetime=RFlight.DepartureTime;
    const Rbcsc=RFlight.BusinessClassSeatsCount;
    const Recsc=RFlight.EconomyClassSeatsCount;
    const Rfcsc= RFlight.FirstClassSeatsCount;
    const RFD= RFlight.FlightDate;
    const Rfrom=RFlight.From;
    const Rto= RFlight.To;
    const Rarrivalterminal= RFlight.TerminalArrival;
    const Rdepartureterminal= RFlight.TerminalDeparture;
    const RFCost = RFlight.FlightCost;

    let ChosenFirstSeats = localStorage.getItem("ChosenFirstSeats");
    let ChosenFirstTypes = localStorage.getItem("ChosenFirstSeatsTypes")
    let ChosenReturnSeats = localStorage.getItem("ChosenReturnSeats");
    let ChosenReturnTypes = localStorage.getItem("ChosenReturnSeatsTypes")
    const chosenFS = ChosenFirstSeats.split(',')
    const chosenFT = ChosenFirstTypes.split(',')
    const chosenRS = ChosenReturnSeats.split(',')
    const chosenRT = ChosenReturnTypes.split(',')
    const totalCost = RFCost + FCost;
    let user = localStorage.getItem("User")

    // const 
    const addFlightObject = {
        "._id":Flight._id,
        "._id2":RFlight._id,
        "Uid":"fd5c54aa-3371-4f29-8b39-9f60e6931a9d",
        "Name":"Aly",
        "Email":"aly@gmail.com",
        "dob":"2021-12-19T23:45:10.381+00:00",
        //FirstFlight
        "depFlightNo":Flight.flightno,
        "depFlightSeats":chosenFS,
        "firstFrom":Flight.From,
        "firstTo":Flight.To,
        "firstDate":Flight.FlightDate,
        "firstTerminalDep":Flight.TerminalDeparture,
        "FirstTerminalArr":Flight.TerminalArrival,
        "FirstArrTime":Flight.ArrivalTime,
        "FirstDepTime":Flight.DepartureTime,
        "FirstDuration":Flight.TripDuration,
        "FirstSeatType":chosenFT,
        "FirstCost":FCost,

        //SecondFlight
        "retFlightNumber":RFlight.flightno,
        "retFlightSeats":chosenRS,
        "secondFrom":Flight.From,
        "secondTo":Flight.To,
        "secondFlightDate":Flight.FlightDate,
        "secondTerminalDep":Flight.TerminalDeparture,
        "secondTerminalArr":Flight.TerminalArrival,
        "secondArrTime":Flight.ArrivalTime,
        "secondDepTime":Flight.DepartureTime,
        "secondDuration":Flight.TripDuration,
        "secondSeatTypes":chosenRT,
        "secondCost":FCost,
        "totalCost":totalCost





    }

    return(
        <div>
            <h1>Booking Number: {flightno}{Rflightno}</h1>
        <h1 align="center" color="#d89d28">Departure Flight</h1>
                    <p align="center">  Flight number: {flightno} , Date: {FD},Departure Time: {departuretime} , Arrival Time: {arrivaltime}, Buisness Seats: {bcsc}, Economy Seats: {ecsc},FirstClass Seats: {fcsc},From: {from},To: {to}, Arrival Terminal: {arrivalterminal}, Departure Terminal: {departureterminal}, Seats:{ChosenFirstSeats},Seats Types:{ChosenFirstTypes},Flight Cost:{FCost} </p>  
                    <br/>

                    <h1 align="center" color="#d89d28">Return Flight</h1>
                    <p align="center">  Flight number: {Rflightno} , Date: {RFD},Departure Time: {Rdeparturetime} , Arrival Time: {Rarrivaltime}, Buisness Seats: {Rbcsc}, Economy Seats: {Recsc},FirstClass Seats: {Rfcsc},From: {Rfrom},To: {Rto}, Arrival Terminal: {Rarrivalterminal}, Departure Terminal: {Rdepartureterminal} , Seats:{ChosenReturnSeats},Seats Types:{ChosenReturnTypes},Flight Cost:{RFCost}</p>  
                    <br/>
                    <h1 align="center" color="#d89d28">Total Cost</h1>
                    <p align="center">Total Cost:{totalCost}</p>
                    

                    

                    <StyledTableCell align="center">
                 <Button 
                variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Confirm Booking</Button>
                </StyledTableCell>


                    </div>
)
}

export default Summary2;