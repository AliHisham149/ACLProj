import React from 'react'
import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
import Layout from './Layout';
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import SearchResultsu from './SearchResultsu'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SearchBody from './SearchBody';
function ReturnFlight(props) {
    const [flights, setFlights] = useState({ from: "", to: "", date: "", arr: "", dep: "", tdep: "", tarr: "", ec: "", bs: "", first: "", flightNum: "" })
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
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchRes, setSearchRes] = useState(false);
    const [cabin, setCabin] = useState("");
    useEffect(() => {
        if (!searchClicked) {
            return false;
        }
        if (searchClicked) {
            setFlights({ from: from, to: to, date: date, arr: arr, dep: dep, tdep: tdep, tarr: tarr, ec: ec, bs: bs, first: first, flightNum: flightNum, })
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
                From: props.to,
                To: props.from,
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
                    console.log(response.data)

                    setFlightlist(response.data);
                    console.log(flightlist);
                    setSearchClicked(false)
                    setSearchRes(true);
                }

                )
            //  return()=>{setSearchClicked(false)};
        }


        //.catch(err => {console.log(err)});
    });
    console.log(props.flightA)
    //useEffect(() => {search()});
    return (
        <div style={{ marginTop: 0 }}>


            {
                searchRes ? <SearchResultsu flightlist={flightlist} cabin={cabin} arrid={props.arrid}  flightA={props.flightA} /> : (props.back ? props.component : <div>

                    <div style={{ marginTop: 300, marginLeft: -130, marginRight: 30 }}>
                        <h1 style={{ marginLeft: 90, color: "#112D4E" }}>  Book your return flight</h1>
                        <form >
                            <br />


                            <TextField 
                            style={{ marginLeft: 160 }}

                                required    
                                id="outlined-error"
                                label="Date"
                                defaultValue=""
                                onChange={event => setDate(event.target.value)}

                            />

                            

                            <TextField
                                style={{ marginLeft: 175 }}
                                disabled
                                id="outlined-disabled"
                                label="From"
                                defaultValue=""
                                onChange={event => setFrom(event.target.value)}
                            />


                            <br />


                            <br />

                            <TextField
                                style={{ marginLeft: 175 }}
                                disabled
                                id="outlined-disabled"

                                label="To"
                                defaultValue=""
                            // onChange={event => setTo(event.target.value)}

                            />


                            <FormControl component="fieldset" style={{ marginLeft: 160, color: '#112D4E' }}>
                                <FormLabel component="legend">Cabin</FormLabel>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={event => setCabin(event.target.value)}>
                                    <FormControlLabel value="Economy" control={<Radio />} label="Economy" />
                                    <FormControlLabel value="Business" control={<Radio />} label="Business" />
                                    <FormControlLabel value="First" control={<Radio />} label="First" />

                                </RadioGroup>
                            </FormControl>

                            <br />


                            <br />

                            <Button variant="contained" style={{ position: 'center', marginLeft: 570, marginTop: 0 }} onClick={(event) => setSearchClicked(true)}>
                                Next
                            </Button>

                        </form>
                    </div>
                </div>

                )}
        </div>
    )
}

export default ReturnFlight