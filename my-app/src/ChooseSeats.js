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


function ChooseSeats(){
    let navigate = useNavigate();


    let F=localStorage.getItem("flight");
    const Flight= JSON.parse(F);
    console.log(Flight);

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
    var firstSeatMap = Flight.SeatMap
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
    var returnSeatMap = RFlight.SeatMap
    const [returnSeats,setReturnSeats] = useState("");
    const [firstSeats,setFirstSeats] = useState("");
    firstSeatMap = firstSeatMap.toString();
    returnSeatMap = returnSeatMap.toString();
    const [returnSeatsType,setReturnSeatsType] = useState("");
    const [firstSeatsType,setFirstSeatsType] = useState("");





    return(
        <div>
        
      
        <p>IMPORTANT NOTE: Seats starting with letter A are first class seats, seats starting with letter B are business class seats, seats starting with letter C are economy seats</p>
        
        <p>IMPORTANT NOTE 2: Write the seats in boxes in the format "A1,A2,A3,etc..."</p>
        <p>IMPORTANT NOTE 3: After Choosing your seats write your seats type to confirm "Economy,Business,First"</p>

        {/* <Button></Button> */}
        <h1 align="left" color="#d89d28">Choose Seats for Departure Flight</h1>
                    <p align="left">  Avaiable Seats: {firstSeatMap} </p>  
                    
                    <input type="text" id="from" name="from" onChange={event => setFirstSeats(event.target.value)} />    
                    <p align="left">  Confirm Chosen Seats Type For Departure Flight: </p>  
                    <input type="text" id="from" name="from" onChange={event => setFirstSeatsType(event.target.value)} />    



                    <br/>

                    <h1 align="left" color="#d89d28">Choose Seats for Return Flight</h1>
                    <p align="left">  Return Seats: {returnSeatMap} </p>
                    <input type="text" id="from" name="from" onChange={event => setReturnSeats(event.target.value)} />    
                    <p align="left">  Confirm Chosen Seats Type For Return Flight: </p>  
                    <input type="text" id="from" name="from" onChange={event => setReturnSeatsType(event.target.value)} />    
                    <br/>

                    <StyledTableCell align="center">
                 <Button onClick={() =>{navigate("/Summary2");
                localStorage.setItem("ChosenFirstSeats",firstSeats)
                localStorage.setItem("ChosenReturnSeats",returnSeats)
                localStorage.setItem("ChosenFirstSeatsTypes",returnSeatsType)
                localStorage.setItem("ChosenReturnSeatsTypes",firstSeatsType)

                }} 
                variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Confirm Seats</Button>
                </StyledTableCell>


                    </div>
    )
}
export default ChooseSeats;