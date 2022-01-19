import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Reservation from './Reservation';
import dateFormat from 'dateformat';
import { useNavigate, useLocation, BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

export default function ReservedFlights() {
    
   
    const [Flights, setFlights] = useState([]);
    const location = useLocation();
    const id= localStorage.getItem("id");
    let navigate=useNavigate();
    console.log(id);
    useEffect(() => {
        axios.post('http://localhost:8080/viewUsersReservations', {
            user:id
        }).then(res => {
            console.log(res.data)
            console.log("xxxx");
            setFlights(res.data)
            console.log(res.data);
        })
    })
    return (
        <div>
                <h1 style={{ color: ' #161342', marginLeft: 550,marginTop:1000}}>{}</h1>
                {Flights.map((u) => {
                    return <Reservation
                    res={u}
                    _id={u._id}
                    departure={u.DepartId} returnFlight ={u.ReturnId} cost={u.Total}
                    departureDate ={dateFormat(u.DepartId.FlightDate, "dd/mm/yyyy")}
                    returnDate = {dateFormat(u.ReturnId.FlightDate, "dd/mm/yyyy")}
                    DepartPrice = {u.DepartPrice}
                    DepartPriceTotal={u.DepartPriceTotal}
                    ReturnPrice={u.ReturnPrice}
                    ReturnPriceTotal ={u.ReturnPriceTotal}
                    DepartSeats= {u.DepartSeats} 
                    returnSeats = {u.ReturnSeats} ReturnPassengersChild={u.ReturnPassengersChild} 
                     ReturnPassengersAdult={u.ReturnPassengersAdult} 
                    ReturnCabin={u.ReturnCabin} DepartCabin={u.DepartCabin} 
                    DepartPassengersAdult={u.DepartPassengersAdult}
                    DepartPassengersChild={u.DepartPassengersChild}
                    user={id}
                    /> 
                    
                })}
        
        </div>
    )
}
