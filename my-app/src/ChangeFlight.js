import ResultCard from './ResultCard'
import * as React from 'react'
import Container from '@mui/material/Container';
import { spacing } from '@mui/system';
import { Card } from '@mui/material';
import { useState, useEffect } from 'react';
import ViewDetails from './ViewDetails';
import Chosen from './Chosen';
import axios from 'axios'
import { Box, Fade, Backdrop, Typography, Modal } from '@mui/material';
import { Link, BrowserRouter, useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';


function findArrayElementByTitle(array, id) {
  return array.find((element) => {
    return element._id === id;
  })
}
export default function ChangeFlight() {

  const [clickedRes, setClickedRes] = useState(false);
  const [flight, setFlight] = useState("");
  // const [cabin, setCabin] = useState("Business");
  // const [adultPass, setAdult] = useState(2);
  // const [childPass, setChild] = useState(1);



  const navigate = useNavigate();
  const location = useLocation()
  const [flightlist, setFlightlist] = useState([]);
  const [flightlist2, setFlightlist2] = useState([]);
  //departurelist, returnlist ,cabin ,adultPass,childPass} = location.state
  const { flights, reservation, dep, price, tprice, total, cabin, adultPass, childPass } = location.state;
  const id= localStorage.getItem("id");

  const [flist, setList] = useState([]);

  useEffect(() => {
    console.log(price);
    if (dep) {
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

          console.log(response.data)
          setList(response.data);
          console.log(flist);
        }

        )
    }
    else {
      if (flights.from === "") {
        delete flights.from;

      }
      if (flights.to === "") {
        delete flights.to;

      }
      if (flights.retDate === "") {
        delete flights.retDate;

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
        From: flights.to,
        To: flights.from,
        FlightDate: flights.retDate,

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

          setList(response.data);
          console.log(flist);

        }

        )
    }

  }, []);

  function pr(u) {
    if (cabin == "Economy") {
      return u.EcoPrice;
    }
    else if (cabin == "Business") {
      return u.BusPrice;
    }
    else {
      return u.FPrice;
    }
  }
  function tot(u) {
    var prc = pr(u);
    console.log(prc);
    return (prc * adultPass + prc * childPass * 0.5);
  }
  return (
    <div style={{ transform: "scale(0.8)",marginTop:800 }} >

      {clickedRes ? <>  <div>

        <h1 style={{ color: ' #161342', marginLeft: 270, marginTop: 0 ,fontFamily:'Verdana',fontWeight:'bold'}}>Your New Chosen Flight</h1>;
        <div style={{marginLeft:-200}}>
          <Chosen
            Price={cabin == "Economy" ? flight.EcoPrice : cabin == "Business" ? flight.BusPrice : flight.FPrice}
            totalPrice={cabin == "Economy" ? flight.EcoPrice * adultPass + flight.EcoPrice * childPass * 0.5 : cabin == "Business" ? flight.BusPrice * adultPass + flight.BusPrice * childPass * 0.5 : flight.FPrice * adultPass + flight.FPrice * childPass * 0.5}
            cabin={cabin}
            child={childPass}
            adult={adultPass}
            flightID={flight._id}
            DepartureTime={flight.DepartureTime}
            ArrivalTime={flight.ArrivalTime}
            FlightNu={flight.FlightNu}
            From={flight.From}
            To={flight.To}
            TripDuration={flight.TripDuration}
            click={setClickedRes}
            flight={setFlight}
          />
        </div>
        <Typography >
          Ticket Price Difference: {pr(flight) - price}$
        </Typography>
        <Typography >
          Total Price Difference: {tot(flight) - tprice}$
        </Typography>
        <Button variant="outlined" style={{marginLeft:900,color:'white',backgroundColor:'#161342'}} onClick={() => {
          navigate("/NewSeats", { state: { flight: flight, cab: cabin, adult: adultPass, child: childPass, reservation: reservation, price: price, dep: dep, tprice: tprice, total: total,id:id } });
        }}>Choose your seats</Button>
      </div><br /></> :

        <div>
          <h1 style={{ color: ' #161342', marginLeft: 350 }}>Choose your new flight</h1>;
          <Card style={{ backgroundColor: ' #cccccc', paddingTop: 100, paddingLeft: 50, paddingRight: 50, borderColor: "blue", borderRadius: 10 ,marginTop:20}}>
            {flist.map((u) => {
              return <div><ResultCard Price={cabin == "Economy" ? u.EcoPrice : cabin == "Business" ? u.BusPrice : u.FPrice}
                totalPrice={cabin == "Economy" ? u.EcoPrice * adultPass + u.EcoPrice * childPass * 0.5 : cabin == "Business" ? u.BusPrice * adultPass + u.BusPrice * childPass * 0.5 : u.FPrice * adultPass + u.FPrice * childPass * 0.5}
                cabin={cabin}
                child={childPass}
                adult={adultPass}
                flightID={u}
                DepartureTime={u.DepartureTime}
                ArrivalTime={u.ArrivalTime}
                FlightNu={u.FlightNu}
                From={u.From}
                To={u.To}
                TripDuration={u.TripDuration}
                click={setClickedRes}
                flight={setFlight}
              />
              <div style={{marginBottom:30}}>
                <Typography style={{ color: '#161342', fontweight: 'bold' }}>
                  Ticket Price Difference: {pr(u) - price}$
                </Typography>
                </div>
              </div>
            })}

          </Card>
        </div>
      }

    </div>
  )
}