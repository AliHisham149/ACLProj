import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function AddFlightForm(props) {
  const [show, setShow] = useState(false);
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
  const [flightCost,setFlightCost] = useState("");
  const [duration,setFlightDuration] = useState("");
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      axios.post('http://localhost:8080/addFlight', {
        FlightNumber: flightNum,
        From: from,
        To: to,
        FlightDate: date,
        ArrivalTime: arr,
        DepartureTime: dep,
        FlightDuration: duration,
        TerminalDeparture: tdep,
        TerminalArrival: tarr,
        EconomyClassSeatsCount: ec,
        BusinessClassSeatsCount: bs,
        FirstClassSeatsCount: first,
        FlightCost:flightCost,
      })
        .then(function (response) {
          console.log("xxx");
        })
      setShow(false);
      setClicked(false);
    }
  });


  return (
  
  


          <form >
            Flight Number: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                From:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                To:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                Date:&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Departure Time:

            <br />

            <input type="text" id="from" name="from" onChange={event => setFlightNum(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" id="from" name="from" onChange={event => setFrom(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" id="to" name="to" onChange={event => setTo(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="date" id="date" name="date" onChange={event => setDate(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" id="cabin" name="cabin" onChange={event => setArr(event.target.value)} />
            <br/>
            Arrival Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Duration:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               
                Departure Terminal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Arrival Terminal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
            <br />
            <input type="text" id="seat" name="seat" onChange={event => setDep(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
            <input type="number" id="cabin" name="cabin" onChange={event => setTdep(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" id="cabin" name="cabin" onChange={event => setFlightDuration(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" id="cabin" name="cabin" onChange={event => setTarr(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



            <br />
            Business Seats Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            First Seats Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            Economy Seats Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Total Cost:
            <br />
            <input type="number" id="cabin" name="cabin" onChange={event => setBs(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" id="cabin" name="cabin"  onChange={event => setFirst(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" id="cabin" name="cabin" onChange={event => setEc(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" id="cabin" name="cabin" onChange={event => setFlightCost(event.target.value)} />
            <br />
            <br />
           
            <br />
            

            <br />
            <Button variant="primary" onClick={(event) => setClicked(true)}>
            ADD
          </Button>
          </form>
           
       
  );
}

export default AddFlightForm
