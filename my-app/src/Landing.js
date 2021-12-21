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
import SearchBody from './SearchFlight';
import Login from './Login';
import Admin from './Admin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
// import Routing from './Routing';

function Landing(){
return (
<div>
<Navbar></Navbar>

{/* <Routing></Routing> */}
</div>
)
}
export default Landing;