import React from 'react'
//import { useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'
//import ReturnSeats from './ReturnSeats'
import { Paper } from '@mui/material'
export default function Seats() {
    const location = useLocation()
    const { flight, cab, adult, child, reservation, dep, price, tprice, total } = location.state
    const id= localStorage.getItem("id");
    // const id = "6185ad7b250c46b0fd2322ea";
    //const cabinClass = "Economy";
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
                marginTop:-200,marginLeft:-300
            }}>
                 <h1 style={{color:"#161342", marginLeft:240,marginTop:100}}>SELECT YOUR PREFERRED SEATS</h1>

<h4 style={{color:"#161342", marginLeft:240}}>Note: blue seats are economy, navy blue seats are business, yellow seats are first class </h4>

                <div style={{ marginLeft: "240px", width: "450px", marginTop: 0 }}>
                    {eco.map(u => {
                        return <Button id={u.seat} onClick={(e) => { addSeat(u.seat); clickE(e, u.seat) }} disabled={u.res} variant="outlined" size="small" style={{ opacity: u.res ? 0.5 : 1, display: " inline-block", transform: "scale(0.7)", color: "white", backgroundColor: "blue" }}>{u.seat}</Button>
                    })}
                </div>
                <div style={{ marginLeft: "710px", width: "320px", marginTop: "-120px" }}>
                    {bus.map(u => {
                        return <Button id={u.seat} onClick={(e) => { addSeat(u.seat); clickB(e, u.seat) }} disabled={u.res} variant="outlined" size="small" style={{ opacity: u.res ? 0.5 : 1, display: " inline-block", transform: "scale(0.7)", color: "white", backgroundColor: "#161342" }}>{u.seat}</Button>
                    })}
                </div>
                <div style={{ width: "200px", marginLeft: "1100px", marginTop: -50 }}>
                    {fst.map(u => {
                        return <Button id={u.seat} onClick={(e) => { addSeat(u.seat); clickF(e, u.seat) }} disabled={u.res} variant="outlined" size="small" style={{ opacity: u.res ? 0.5 : 1, display: " inline-block", transform: "scale(0.7)", color: "#161342", backgroundColor: "gold" }}>{u.seat}</Button>
                    })}
                </div>

            </div>
            <Button variant="outlined" style={{ color: "white", backgroundColor: "#161342", marginLeft: "550px", marginTop: "100px" }} onClick={() => {
                if (chosen.length == (adult + child)) {
                    navigate("/NewSummary", { state: { flight: flight, cab: cab, adult: adult, child: child, seats: chosen, reservation: reservation, dep: dep, price: price, tprice: tprice, total: total,id:id } });
                    console.log(chosen);
                }
                else {
                    handleClick();
                }
            }}>Proceed to payment</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You must choose seats equal to selected number of passengers!
                </Alert>
            </Snackbar>
        </div>
    )
}


