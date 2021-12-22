import './App.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteFlight from './DeleteFlight';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import AddFlightForm from './AddFlight';
import UpdateFlight from './UpdateFlight';
import UserSearchBody from './UserSearchFlight';
import Login from './Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import Itinerary from './itinerary';


function Profile(){
    let U=localStorage.getItem("User");
    // const User= JSON.parse(U);
    // console.log(U);

    // const Name= User.Name;
    // const email=User.Email;

    return(
        <div>
        <h1 align="center" color="#d89d28"> Personal info</h1>
                    {/* <p align="center"> Name: {Name} , Email: {email}  </p>   */}
                    <br/>

                    {/* <h1 align="center" color="#d89d28">Return Flight</h1>
                    <p align="center">  Flight number: {Rflightno} , Date: {RFD},Departure Time: {Rdeparturetime} , Arrival Time: {Rarrivaltime}, Buisness Seats: {Rbcsc}, Economy Seats: {Recsc},FirstClass Seats: {Rfcsc},From: {Rfrom},To: {Rto}, Arrival Terminal: {Rarrivalterminal}, Departure Terminal: {Rdepartureterminal} </p>  
                    <br/> */}

                    {/* <StyledTableCell align="center">
                 <Button onClick={() =>{ 
                     if(Check==true) 
                         navigate("/ChooseSeats")
                        ;
                        else
                        alert("please login first");
                        
                        
                
                }} 
                variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Confirm Booking</Button>
                </StyledTableCell> */}


                    </div>
)


}

export default Profile;