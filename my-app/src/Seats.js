import React from 'react'
//import { useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Snackbar, Alert, Typography } from '@mui/material'
import AirplanemodeActive from '@mui/icons-material/AirplanemodeActive'
//import ReturnSeats from './ReturnSeats'
import { Paper } from '@mui/material';

export default function Seats() {
    const location = useLocation()
    const { depFlight, retFlight, cab, adult, child } = location.state
    const id= localStorage.getItem("id");

    const [eco, setEco] = useState([]);
    const [bus, setBus] = useState([]);
    const [fst, setFst] = useState([]);
    const [chosen, setChosen] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    function addSeat(u) {
        setChosen(chosen.concat([u]));
        console.log(chosen);
    }
    function removeSeat(u) {
        setChosen(chosen.filter(function (value, index, arr) {
            return value != u;
        }));
        console.log(chosen);
    }


    function clickE(event, u) {

        console.log(event);
        if (!chosen.includes(u)) {
            event.currentTarget.style.backgroundColor = "white";
            event.currentTarget.style.color = "blue";
            addSeat(u);
        }
        else {
            event.currentTarget.style.backgroundColor = "blue";
            event.currentTarget.style.color = "white";
            removeSeat(u)
        }
    }
    function clickB(event, u) {
        if (!chosen.includes(u)) {
            event.currentTarget.style.backgroundColor = "white";
            event.currentTarget.style.color = "#161342";
            addSeat(u);
        }
        else {
            event.currentTarget.style.backgroundColor = "#161342";
            event.currentTarget.style.color = "white";
            removeSeat(u);
        }
    }
    function clickF(event, u) {
        if (!chosen.includes(u)) {
            event.currentTarget.style.backgroundColor = "white";
            event.currentTarget.style.color = "gold";
            addSeat(u);
        }
        else {
            event.currentTarget.style.backgroundColor = "#161342";
            event.currentTarget.style.color = "gold";
            removeSeat(u);
        }
    }
    console.log(depFlight._id)
    console.log(cab)
    useEffect(() => {
        axios.post('http://localhost:8080/flightSeatsInfo', {
            _id: depFlight._id,
            cabin: cab
        })
            .then(function (response) {
                console.log("xxx");

                setEco(response.data.Economy);
                setBus(response.data.Business);
                setFst(response.data.First);
            }
            )
    }, []);

    return (
        <div>

            <div style={{marginLeft:-300}}



            >
                <h1 style={{color:"#161342", marginLeft:240,marginTop:0}}>SELECT YOUR PREFERRED SEATS</h1>

                <h4 style={{color:"#161342", marginLeft:240}}>Note: blue seats are economy, navy blue seats are business, yellow seats are first class </h4>
                <div style={{ marginLeft: "240px", width: "450px", marginTop: 180 }}>
                    {eco.map(u => {
                        return <Button id={u.seat} onClick={(e) => { addSeat(u.seat); clickE(e, u.seat) }} disabled={u.res} variant="outlined" size="small" style={{ opacity: u.res ? 0.5 : 1, display: " inline-block", transform: "scale(0.85)", color: "white", backgroundColor: "blue" }}>{u.seat}</Button>
                    })}
                </div>
                <br />

                <div style={{ marginLeft: "720px", width: "320px", marginTop: -85 }}>
                    {bus.map(u => {
                        return <Button id={u.seat} onClick={(e) => { addSeat(u.seat); clickB(e, u.seat) }} disabled={u.res} variant="outlined" size="small" style={{ opacity: u.res ? 0.5 : 1, display: " inline-block", transform: "scale(0.85)", color: "white", backgroundColor: "#161342" }}>{u.seat}</Button>
                    })}
                </div>
                <br />

                <div style={{ width: "200px", marginLeft: "1050px", marginTop: -100 }}>
                    {fst.map(u => {
                        return <Button id={u.seat} onClick={(e) => { addSeat(u.seat); clickF(e, u.seat) }} disabled={u.res} variant="outlined" size="small" style={{ opacity: u.res ? 0.5 : 1, display: " inline-block", transform: "scale(0.85)", color: "#161342", backgroundColor: "gold" }}>{u.seat}</Button>
                    })}
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button variant="outlined" style={{ color: "white", backgroundColor: "#161342", marginLeft: 300, marginTop: -100 }} onClick={() => {
                if (chosen.length == (adult + child)) {
                    navigate("/ReturnSeats", { state: { depFlight: depFlight, retFlight: retFlight, cab: cab, adult: adult, child: child, departureSeats: chosen,id:id} });
                    console.log(chosen);
                }
                else {
                    handleClick();
                }
            }}>Return flight seats</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You must choose seats equal to selected number of passengers!
                </Alert>
            </Snackbar>
        </div>
    )
}


