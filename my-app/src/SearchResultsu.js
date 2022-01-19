import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import DeleteIcon from '@mui/icons-material/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteFlight from './DeleteFlight';
import SearchFlight from './SearchFlight';
//import AddFlightForm from './AddFlightForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from '@mui/material/styles';

import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UpdateButton from './UpdateButton'
//import { Button } from '@material-ui/core';
import { MDBCol, MDBIcon } from "mdbreact";
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';

import Icon from '@mui/material/Icon';
import { Button } from 'react-bootstrap';
import AddFlightForm from './AddFlightForm';
import UpdateFlight from './UpdateFlight';
import SearchBody from './SearchBody';
import Layout from './Layout';
import ReturnFlight from './ReturnFlight'
import ChooseSeat from './ChooseSeat';
import { set } from 'mongoose';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import ViewDetails from './ViewDetails';
import { Stack } from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SearchResultsu(props) {
    const [flightlist, setFlightlist] = useState([]);
    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [arr, setArr] = useState("");
    const [dep, setDep] = useState("");
    const [tdep, setTdep] = useState("");
    const [tarr, setTarr] = useState("");
    const [ec, setEc] = useState("");
    const [bs, setBs] = useState("");
    const [first, setFirst] = useState("");
    const [flightNum, setFlightNum] = useState("");
    const [clickedRes, setClickedRes] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [FlightID, setArrFID] = useState("");
    const [retFlightID, setRetFID] = useState("");
    const [id, setFidD] = useState("");
    const [chosen, setChosen] = useState({});
    const handleClose1 = () => setShow(false);
    const handleShow1 = () => setShow(true);

    const [open, setOpen] = React.useState(false);

    const handleClickSB = () => {
        setOpen(true);
    };

    const handleCloseSB = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

console.log(props.flightA)


    return (<div style={{ marginTop: -200, marginLeft: 60 }}>

        {clickedRes ? <> <ChooseSeat id={chosen._id} cabin={props.cabin} arrid={props.arrid} flightA={props.flightA} flightB={chosen} /><br />
        </> : (clicked ? <ReturnFlight from={flightlist.from} to={flightlist.to} arrid={chosen._id} flightA={chosen}/> : (props.back ? props.component :
            <div style={{ marginTop: 500 }}>

                <TableContainer component={Paper} style={{ width: 1200, marginLeft: 20, marginTop: 200, opacity: 0.9 }}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Flight Number</StyledTableCell>
                                <StyledTableCell align="center">Departure Airport</StyledTableCell>
                                <StyledTableCell align="center">Arrival Airport</StyledTableCell>
                                <StyledTableCell align="center">Flight Date&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Arrival time&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Departure Time</StyledTableCell>
                                <StyledTableCell align="center">Trip Duration&nbsp; </StyledTableCell>
                                <StyledTableCell align="center">Departure Terminal</StyledTableCell>
                                <StyledTableCell align="center">Arrival Terminal</StyledTableCell>
                                <StyledTableCell align="center">Ticket Price</StyledTableCell>
                                <StyledTableCell align="center">&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">&nbsp;</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                                {/* <StyledTableCell align="center">Economy seats available</StyledTableCell>
                            <StyledTableCell align="center">Economy seats price</StyledTableCell>
                            <StyledTableCell align="center">Business seats available&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Business seats price &nbsp; </StyledTableCell>
                            <StyledTableCell align="center">First seats available</StyledTableCell>
                            <StyledTableCell align="center">First seats price </StyledTableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableRow> </TableRow>



                        {props.flightlist.map(u => {
                            return <TableRow key={u._id}>
                                <StyledTableCell align="center">{u.FlightNu}</StyledTableCell>
                                <StyledTableCell align="center">{u.From} </StyledTableCell>
                                <StyledTableCell align="center">{u.To}</StyledTableCell>
                                <StyledTableCell align="center">{u.FlightDate}</StyledTableCell>
                                <StyledTableCell align="center">{u.DepartureTime}</StyledTableCell>
                                <StyledTableCell align="center">{u.ArrivalTime}</StyledTableCell>
                                <StyledTableCell align="center">{u.TripDuration}</StyledTableCell>
                                <StyledTableCell align="center">{u.TerminalDeparture}</StyledTableCell>
                                <StyledTableCell align="center">{u.TerminalArrival}</StyledTableCell>
                                {props.cabin === "Economy" ? <StyledTableCell align="center">{u.EcoPrice}</StyledTableCell> : (
                                    props.cabin === "Business " ? <StyledTableCell align="center">{u.BusPrice}</StyledTableCell> :
                                        <StyledTableCell align="center">{u.FPrice} </StyledTableCell>)}
                                <StyledTableCell align="center"> <ViewDetails from={u.From} to={u.To} /> </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack spacing={2} sx={{ width: '100%' }}>
                                    <Button variant="outline-primary" onClick={(event) => {handleClickSB(); {setChosen(u)} }}>Book Now</Button>

                                        <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSB}>
                                            <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
                                                Flight booked successfully
                                            </Alert>
                                        </Snackbar>
                                    </Stack>
                                    </StyledTableCell>


                                    

                            </TableRow>
                        })}
                    </Table>
                </TableContainer>
                <br />
                <br />
        <Button variant="primary" style={{ marginLeft: -50 }} onClick={event => {
                    props.type == "Departure" ?
                        setClicked(true) : setClickedRes(true)
                }} >Next</Button>

                {/* <ViewDetails from={chosen.From} to={chosen.To} /> */}
            </div>))
        }
        {/* <h1 style={{ color: "black" }}>{chosen._id}</h1>

        <Button variant="outline-primary" onClick={handleShow1}> View Details</Button>

        <h1 style={{ color: "black" }}>  {chosen._id} cabin={props.cabin}</h1> */}

    </div >)

}


export default SearchResultsu