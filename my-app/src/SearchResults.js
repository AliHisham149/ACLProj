

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
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';
import { Button } from 'react-bootstrap';
import AddFlightForm from './AddFlightForm';
import UpdateFlight from './UpdateFlight';
import SearchBody from './SearchBody';
import Layout from './Layout';
import { useLocation, useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { TextField } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Box } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#161342',
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




function SearchResults(props) {
    const navigate = useNavigate();
    const location = useLocation()
    const flights = location.state
    const [flightlist, setFlightlist] = useState([]);
    const [show, setShow] = useState(false);
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
    // const flights = props.flights
    const [clicked, setClicked] = useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {

        if (flights.from === "") {
            delete flights.from;

        }
        if (flights.to === "") {
            delete flights.to;

        }
        if (flights.date === "") {
            delete flights.date;

        }
        if (flights.arr == "") {
            delete flights.arr;

        }
        if (flights.dep === "") {
            delete flights.dep;

        }
        if (flights.tarr === "") {
            delete flights.tarr;

        }
        if (flights.tdep === "") {
            delete flights.tdep;

        }
        if (flights.ec === "") {
            delete flights.ec;

        }
        if (flights.bs === "") {
            delete flights.bs;

        } if (flights.first === "") {
            delete flights.first;

        }
        if (flights.flightNum === "") {
            delete flights.flightNum;

        }


        axios.post('http://localhost:8080/searchFlights', {

            FlightNu: flights.flightNum,
            From: flights.from,
            To: flights.to,
            FlightDate: flights.date,

            ArrivalTime: flights.arr,
            DepartureTime: flights.dep,
            TerminalDeparture: flights.tdep,
            TerminalArrival: flights.tarr,
            NuofAvailableEconomySeats: flights.ec,
            NuofAvailableBuisnessSeats: flights.bs,
            NuofAvailableFirstSeats: flights.first

        })
            .then(function (response) {
                console.log("xxx");


                setFlightlist(response.data);
                console.log(flightlist);
                //   setSearchClicked(false)
                //   setSearchRes(true);
            }

            )
    }, [])
    return (<div style={{ marginTop: 100 }}>

        {clicked ? <SearchBody /> : (props.back ? props.component :
            <div>
              
                <Typography style={{ fontSize: 20, fontWeight: "bold", marginTop: 200, marginLeft: 50, color: ' #161342' }}

                    align="left"
                    gutterBottom
                >
                    <Link style={{ color: '#161342' }} onClick={()=> navigate("/Admin")} href="#">Admin</Link> > Flights

                </Typography>

                <hr style={{ fontSize: 15, fontWeight: "bold", marginLeft: 50, color: ' #161342' }} />

                <TableContainer component={Paper} style={{
                    padding: 0,
                    margin: 0,
                    width: 920,

                    marginLeft: 70,
                    marginTop: 50,
                    opacity: 0.8

                }} >
                    <Table stickyHeader sx={{
                        width: 500,
                        height: 40
                    }}
                        aria-label="customized table" size="small"
                    >
                        <TableHead position="fixed" >
                            <TableRow>
                                <StyledTableCell align="center" size="small">Flight Number</StyledTableCell>
                                <StyledTableCell align="center" size="small">Departure Airport</StyledTableCell>
                                <StyledTableCell align="center">Arrival Airport</StyledTableCell>
                                <StyledTableCell align="center">Flight Date&nbsp; </StyledTableCell>
                                <StyledTableCell align="center">Departure Time</StyledTableCell>
                                <StyledTableCell align="center">Arrival time&nbsp; </StyledTableCell>


                                <StyledTableCell align="center">Departure Terminal</StyledTableCell>
                                <StyledTableCell align="center">Arrival Terminal</StyledTableCell>
                                <StyledTableCell align="center">Seats </StyledTableCell>
                                <StyledTableCell align="center"> Seats price</StyledTableCell>

                                <StyledTableCell align="center">&nbsp; </StyledTableCell>
                                <StyledTableCell align="center">&nbsp; </StyledTableCell>









                            </TableRow>
                        </TableHead>
                        <TableRow> </TableRow>



                        {flightlist.map(u => {
                            return <TableRow key={u._id}>
                                <StyledTableCell align="center" size="small">{u.FlightNu}</StyledTableCell>
                                <StyledTableCell align="center">{u.From} </StyledTableCell>
                                <StyledTableCell align="center">{u.To}</StyledTableCell>
                                <StyledTableCell align="center">{u.FlightDate}</StyledTableCell>
                                <StyledTableCell align="center">{u.DepartureTime}</StyledTableCell>
                                <StyledTableCell align="center">{u.ArrivalTime}</StyledTableCell>


                                <StyledTableCell align="center">{u.TerminalDeparture}</StyledTableCell>
                                <StyledTableCell align="center">{u.TerminalArrival}</StyledTableCell>
                                <StyledTableCell align="center"> E ({u.NuofAvailableEconomySeats}) B({u.NuofAvailableBuisnessSeats}) F({u.NuofAvailableFirstSeats})</StyledTableCell>
                                <StyledTableCell align="center"> E(${u.EcoPrice}) B(${u.BusPrice}) F(${u.FPrice})</StyledTableCell>
                                <StyledTableCell align="center"> <UpdateFlight idd={u._id} from={u.From} to={u.To}
                                    flightNum={u.FlightNu}
                                    date={u.FlightDate}
                                    arr={u.ArrivalTime}
                                    dep={u.DepartureTime}
                                    tdep={u.TerminalDeparture}
                                    tarr={u.TerminalArrival}
                                    ec={u.NuofAvailableEconomySeats}
                                    bs={u.NuofAvailableBuisnessSeats}
                                    first={u.NuofAvailableFirstSeats}
                                />
                                    <br />

                                    <Popup trigger={<IconButton variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false"><DeleteIcon /></IconButton>} position="right center">
                                        <div>Are you sure you want to delete?(if no click anywhere)</div>
                                        <DeleteFlight idd={u._id}></DeleteFlight>
                                    </Popup>



                                </StyledTableCell>

                            </TableRow>

                        })}
                    </Table>
                </TableContainer>
                <br />
                <br />
              

              

              
                <br />
                <br />
                {/* <Button variant="primary" onClick={event => navigate("/Admin")} style={{ marginLeft: 730, marginTop: 100,color:'white',backgroundColor:'#161342' }}>Done</Button> */}

            </div>)}
    </div>)
}

export default SearchResults
