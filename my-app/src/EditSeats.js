import React from 'react'
//import { useLocation } from 'react-router'
import plane from './images/planeOutline.jpeg'
import { Image } from 'react-bootstrap'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
import ReservedFlights from './ReservedFlights'
import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
export default function EditSeats() {
 
    const cabinClass = "Economy";
    const [eco, setEco] = useState([]);
    const [bus, setBus] = useState([]);
    const [fst, setFst] = useState([]);
    const location = useLocation()
    const { flight, seats, cab, reservation, dep, adult, child } = location.state
    const id= localStorage.getItem("id");
    const [chosen, setChosen] = useState(seats);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    function addSeat(u) {
        if (chosen.includes(u)) {
            removeSeat(u);
        }
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
    function updateSeating() {
        axios.post('http://localhost:8080/editSeating', {
            oldseats: seats,
            newSeats: chosen,
            FlightID: flight._id,
            cabin: cab
        }).then(function (response) {
            console.log(" seats db ok");
        })
        console.log(reservation);
        if (dep) {
            axios.post('http://localhost:8080/editReservation', {
                _id: reservation,
                DepartSeats: chosen
            }).then(function (response) {
                console.log("ok");
            })

        }
        else {
            axios.post('http://localhost:8080/editReservation', {
                _id: reservation,
                returnSeats: chosen
            }).then(function (response) {
                console.log("ok");
            })
        }
    }

    useEffect(() => {
        axios.post('http://localhost:8080/flightSeatsInfo', {
            _id: flight._id,
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

            <div style={{
                marginLeft:-200,marginTop:100

            }}>

                    <h1 style={{ color: '#161342', marginLeft: 370, fontWeight: 'bold', fontFamily: 'Verdana', fontSize: 35 }}>SELECT YOUR PREFERRED SEATS</h1>
                    <h4 style={{color:"#161342", marginLeft:240}}>Note: blue seats are economy, navy blue seats are business, yellow seats are first class </h4>

                <div style={{ marginLeft: "300px", width: "450px", marginTop: 0 }}>
                    {eco.map(u => {
                        return <Button onClick={(e) => { clickE(e, u.seat) }} disabled={seats.includes(u.seat) ? false : u.res} variant="outlined" size="small" style={{ display: " inline-block", transform: "scale(0.7)", color: seats.includes(u.seat) ? "#161342" : "white", backgroundColor: seats.includes(u.seat) ? "white" : "blue" }}>{u.seat}</Button>
                    })}
                </div>

                <div style={{ marginLeft: "780px", width: "320px", marginTop: -120 }}>
                    {bus.map(u => {
                        return <Button onClick={(e) => { clickB(e, u.seat) }} disabled={seats.includes(u.seat) ? false : u.res} variant="outlined" size="small" style={{ display: " inline-block", transform: "scale(0.7)", color: seats.includes(u.seat) ? "#161342" : "white", backgroundColor: seats.includes(u.seat) ? "white" : "#161342" }}>{u.seat}</Button>
                    })}
                </div>
                <div style={{ width: "200px", marginLeft: "1150px", marginTop: -140 }}>
                    {fst.map(u => {
                        return <Button onClick={(e) => { clickF(e, u.seat) }} disabled={seats.includes(u.seat) ? false : u.res} variant="outlined" size="small" style={{ display: " inline-block", transform: "scale(0.7)", color: "#161342", backgroundColor: seats.includes(u.seat) ? "white" : "gold" }}>{u.seat}</Button>
                    })}
                </div>

            </div>
            <Button variant="outlined" style={{ color: "white", backgroundColor: "#161342", marginLeft: "700px", marginTop: "100px" }} onClick={() => {
                if (chosen.length == (adult + child)) {
                    updateSeating();
                    navigate("/ReservedFlights",{state:{id:id}});
                }
                else {
                    handleClick();
                }
            }}>Confirm</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You must choose seats equal to selected number of passengers!
                </Alert>
            </Snackbar>
        </div>
    )
}