import React from 'react'
import { ModalFooter } from 'react-bootstrap';
import './flightseatmap.css';
import Checkbox from '@mui/material/Checkbox';
import App from './App';
import Summary from './Summary'
import EditProfile from './EditProfile';
import Layout from './Layout';
import { CssBaseline } from '@mui/material';
import { Container } from '@material-ui/core';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { TableHead } from '@material-ui/core';
import { Paper } from '@mui/material';
import { TableRow } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import axios from 'axios';
import { styled } from '@mui/system';
import { Table } from '@material-ui/core';
import { TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material';
import { Button } from '@material-ui/core';
import { Stack } from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import { Alert } from 'react-bootstrap';
//import { useState } from 'react';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };






function ChooseSeat(props) {
    const [cabinSeats, setCabinSeats] = useState([]);
    const [temp, setTemp] = useState([]);
    const [mariam, setMariam] = useState([]);
    const [reserved, setReserved] = useState([]);
    const [availableSeatsF, setAvailableSeats] = useState([]);
    const [isReserved, setisReserved] = useState("")
    const [bookClicked, setBookedClicked] = useState(false);
    const [flightId, setFlightId] = useState("");
    const [cabin, setCabin] = useState("");
    const [returnFlight, setReturnFlight] = useState("");
    const [retSeats, setRetSeatsClicked] = useState(false);
    const [summary, setSummaryCicked] = useState(false);
    const [id, setid] = useState(props.id)
    const [seats, setSeats] = useState([]);
    const [depseats, setDepseats] = useState([]);
    const [retseats, setRetSeats] = useState([]);
  const[clicked,setClicked]=useState(false)
    useEffect(() => {
        if (props.type == "Departure") {
            setFlightId(props.FlightID)
            setReturnFlight(props.retFlightID)
            console.log("DEPPPPPPPPPPP")
        }
        else {
            setFlightId(props.retFlightID)
        }
    }, [id])

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

    const [checked, setChecked] = useState(true);
    const handleCheck = (event, u) => {
        console.log("hereee");
        console.log(u);
        if (seats.indexOf(u) != -1) { setSeats(seats.push(u)) }
        // else{setSeats(seats.filter((x)=>!(x)===u))}
    }


    //number of adults
    const [noOfAdults, setAduls] = useState({ adults: "" });
    const [noOfChildren, setChildren] = useState({ children: "" });




    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.black,
            //color: theme.palette.common.white,
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

    // var temp = [];
    var x = { name: "", seatResult: false }



    useEffect(() => {
        console.log("cdfvgbhnjkl;");
        axios.post("http://localhost:8080/getAvailableCabinSeats", {

            FlightID: id,
            cabin: props.cabin
        }).then(res => {
            console.log("xxxx");
            console.log(props.id);
            setMariam(res.data);
            console.log("arrid is");
            console.log(props.arrid);
        })


    },[])




    // }, [])


















console.log(props.flightA)

    return (<div>
        {summary ? <Summary flightA={props.flightA} flightB={props.flightB} cabin={props.cabin} seatsA={depseats} seatsB={retseats}/> :
            <div>


                {id === props.id ? <h1 style={{ color: "#112D4E" }}>RETURN FLIGHT SEAT RESERVATION:</h1> : <h1 style={{ color: "black" }}>DEPARTURE FLIGHT SEAT RESERVATION:</h1>}
                {
                    <div>
                        <h1 styles={{ color: '#112D4E' }}>Book your flight seats</h1>

                        <TableContainer component={Paper} style={{
                            padding: 0,
                            margin: 0,
                            width: 400,
                            height: 500,
                            marginLeft: 470,
                            opacity:0.9,

                            marginTop: 280,
                            marginLeft:430,
                            backgroundColor: '#DBE2EF'

                        }} >
                            <Table stickyHeader sx={{
                                width: 600,
                                height: 300
                            }}
                                aria-label="customized table" size="small"
                            >
                                <TableHead position="fixed" >
                                    <TableRow>
                                        <StyledTableCell align="center" size="small">seats</StyledTableCell>
                                        <StyledTableCell align="center" size="small">Choose Seat</StyledTableCell>
                                        <hr style={{ color: '#112D4E' }} />



                                    </TableRow>
                                </TableHead>
                                <TableRow> </TableRow>




                                {mariam.map(u => {
                                    return (<TableRow key={u._id}>
                                        <StyledTableCell align="center" size="small">{u}</StyledTableCell>
                                        {/* <StyledTableCell align="center" size="small" checked={checked}> <Checkbox {...label} onChange={handleChange}> </Checkbox></StyledTableCell> */}
                                        <StyledTableCell>
                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                <Button variant="outlined" style={{marginLeft:160}} onClick={(event) => {
                                                    axios.post("http://localhost:8080/reserveSeats", {
                                                        FlightID: id,
                                                        seats: u,
                                                        cabin: props.cabin

                                                    }).then(res => {
                                                        if(id===props.arrid )
                                                        {
                                                            setDepseats([...depseats,u])
                                                        }
                                                        else{
                                                            setRetSeats([...retseats,u])
                                                        }
                                                        console.log("xxxx");
                                                        console.log(u);
                                                        setClicked(true);

                                                    });
                                                    handleClickSB()
                                                }
                                                } >Reserve </Button>
                                            </Stack>

                                            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSB}>
                                                <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
                                                    Seats reserved successfully
                                                </Alert>
                                            </Snackbar>
                                        </StyledTableCell>

                                    </TableRow>)
                                })}

                            </Table>


                        </TableContainer>


                    </div>

                }
                <br />

                <Button variant="outlined" style={{ color: "#112d4e", background: "#DBE2EF", marginLeft: -190 }} onClick={(event) => {
                    if (id === props.arrid) { setSummaryCicked(true) } else { setid(props.arrid) }
                }} >Book Departure Flight Seats </Button>


            </div >
        }
    </div>
    )
}

export default ChooseSeat