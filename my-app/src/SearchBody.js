import React from 'react'
import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
import Layout from './Layout';
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';

function SearchBody(props) {
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
          setSearchClicked(false)
          setSearchRes(true);
        }

        )
      //  return()=>{setSearchClicked(false)};
    }


    //.catch(err => {console.log(err)});
  });
  //useEffect(() => {search()});
  return (
    <div style={{marginTop:0}}>
    

      {
        searchRes ? <SearchResults flightlist={flightlist}  component= {<SearchResults/>}/> : (props.back? props.component :<div>

          <div style={{marginTop:-800,marginLeft:500,marginRight:20}}>
            <h1 style={{marginLeft:90}}>  Search your flight</h1>
            <form >
              <br />
              <TextField

                required
                id="outlined-error"
                label="Flight Number"
                defaultValue=""
                onChange={event => setFlightNum(event.target.value)}

              />
              
              <TextField style={{marginLeft:40}}

                required
                id="outlined-error"
                label="Date"
                defaultValue=""
                onChange={event => setDate(event.target.value)}

              />

              <br />


              <br />

              <TextField

                required
                id="outlined-error"
                label="Depature Airport"
                defaultValue=""
                onChange={event => setFrom(event.target.value)}
              />



              
              <TextField
               style={{marginLeft:40}}
                required
                id="outlined-required"
                label="Arrival Airport"
                defaultValue=""
                onChange={event => setTo(event.target.value)}

              />


              <br />

              <br />
            
             
              <TextField
                required
                id="outlined-required"
                label="Departure Terminal"
                defaultValue=""
                onChange={event => setTdep(event.target.value)}

              />
                <TextField
               style={{marginLeft:40}}
                required
                id="outlined-required"
                label="Arrival Terminal"
                defaultValue=""
                onChange={event => setTarr(event.target.value)}

              />


              <br />
              
              <br />
             


               
              <TextField
                required
                id="outlined-required"
                label="Depature Time"
                defaultValue=""
                onChange={event => setDep(event.target.value)}

              />
               <TextField
              style={{marginLeft:40}}
                required
                id="outlined-required"
                label="Arrival Time"
                defaultValue=""
                onChange={event => setArr(event.target.value)}

              />

              <br />
            
              <br />
              <TextField
                required
                id="outlined-required"
                label="Economy Seats"
                defaultValue=""
                onChange={event => setEc(event.target.value)}

              />

              
              <TextField
                required
                style={{marginLeft:40}}
                id="outlined-required"
                label="Business Seats"
                defaultValue=""
                onChange={event => setBs(event.target.value)}

              />

              <br />
              
              <br />
              <TextField
                required
                id="outlined-required"
                label="Arrival Time"
                defaultValue=""
                onChange={event => setFirst(event.target.value)}

              />

              <br />

              <Button variant="contained" style={{ position: 'center', marginLeft: 390, marginTop: -90 }} onClick={(event) => setSearchClicked(true)}>
                Search
              </Button>

            </form>
          </div>
        </div>

         ) }
    </div>
  )
}

export default SearchBody