import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import UpdateFlight from './UpdateFlight';
import DeleteFlight from './DeleteFlight';
import {Popup} from 'reactjs-popup';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));









function SelectedFlight(){
    let F=localStorage.getItem("flight");
    const Flight= JSON.parse(F);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const flightno= Flight.FlightNumber;
    const arrivaltime=Flight.ArrivalTime;
    const departuretime=Flight.DepartureTime;
    const bcsc=Flight.BusinessClassSeatsCount;
    const ecsc=Flight.EconomyClassSeatsCount;
    const fcsc= Flight.FirstClassSeatsCount;
    const FD= Flight.FlightDate;
    const from=Flight.From;
    const to= Flight.To;
    const arrivalterminal= Flight.TerminalArrival;
    const departureterminal= Flight.TerminalDeparture;
    const [returnflightlist, setReturnFlightlist] = useState([]);
    const [clicked, setClicked] = useState(false);
    
    
    useEffect(() => {
        var queryParams = {
          From:to,
          To: from
        }
        let o = Object.fromEntries(Object.entries(queryParams).filter(([_, v]) => v != ""));
   
              axios.post('http://localhost:8080/searchFlights', o)
                .then(function (response) {
                  setReturnFlightlist(response.data)
                })
              setClicked(false);
          });
    return (

        <div>
                    <form >
                    {/* <h1>Selected Flight</h1>
                    <p align="center">  Flight number: {flightno} , Date: {FD},Departure Time: {departuretime} , Arrival Time: {arrivaltime}, Buisness Seats: {bcsc}, Economy Seats: {ecsc},FirstClass Seats: {fcsc},From: {from},To: {to}, Arrival Terminal: {arrivalterminal}, Departure Terminal: {departureterminal} </p>  
                    <br/> */}

                {/* Flight Number: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                From:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                To:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                Date:&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Departure Time:
                <br />

                <input type="text" id="from" name="from" onChange={event => setFlightNum(event.target.value)} />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" id="from" name="from" onChange={event => setFrom(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" id="to" name="to" onChange={event => setTo(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" id="date" name="date" onChange={event => setDate(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" id="seat" name="seat" onChange={event => setDep(event.target.value)} />
                <br />
                Arrival Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Departure Terminal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Arrival Terminal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Number of economy seats:
                <br />
                <input type="text" id="cabin" name="cabin" onChange={event => setArr(event.target.value)} /> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                <input type="number" id="cabin" name="cabin" onChange={event => setTdep(event.target.value)} />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
                <input type="number" id="cabin" name="cabin" onChange={event => setTarr(event.target.value)} />&nbsp; &nbsp;&nbsp;&nbsp; 
                <input type="number" id="cabin" name="cabin" onChange={event => setEc(event.target.value)} />
               

                <br />
                Number of Buisness seats: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Number of First seats:
                <br />
                <input type="number" id="cabin" name="cabin" onChange={event => setBs(event.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="number" id="cabin" name="cabin"
                  onChange={event => setFirst(event.target.value)} />
                  <br/>
                <br />
                <>  */}

                <TableContainer component={Paper}>
                
                <h1 align="center" color="#d89d28">Selected Flight</h1>
                    <p align="center">  Flight number: {flightno} , Date: {FD},Departure Time: {departuretime} , Arrival Time: {arrivaltime}, Buisness Seats: {bcsc}, Economy Seats: {ecsc},FirstClass Seats: {fcsc},From: {from},To: {to}, Arrival Terminal: {arrivalterminal}, Departure Terminal: {departureterminal} </p>  
                    <br/>

      <h1 align="center" color="#d89d28">Return Flights</h1> 
        <Table sx={{ minWidth: 500 }} aria-label="customized table" size='m'>
          <TableHead>
            
            <TableRow>
              <StyledTableCell align="center">Flight Number</StyledTableCell>
              <StyledTableCell align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">Flight Date</StyledTableCell>
              <StyledTableCell align="center">Arrival time</StyledTableCell>
              <StyledTableCell align="center">Departure Time</StyledTableCell>
              <StyledTableCell align="center">Departure Terminal</StyledTableCell>
              <StyledTableCell align="center">Arrival Terminal</StyledTableCell>
              <StyledTableCell align="center">Economy Seats count</StyledTableCell>
              <StyledTableCell align="center">Business seats count</StyledTableCell>
              <StyledTableCell align="center">First seats count</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableRow> </TableRow>


          {returnflightlist.map(u => {
            return <TableRow key={u._id}>
              <StyledTableCell align="center">{u.FlightNumber}</StyledTableCell>
              <StyledTableCell align="center">{u.From} </StyledTableCell>
              <StyledTableCell align="center">{u.To}</StyledTableCell>
              <StyledTableCell align="center">{u.FlightDate}</StyledTableCell>
              <StyledTableCell align="center">{u.ArrivalTime}</StyledTableCell>
              <StyledTableCell align="center">{u.DepartureTime}</StyledTableCell>
              <StyledTableCell align="center">{u.TerminalDeparture}</StyledTableCell>
              <StyledTableCell align="center">{u.TerminalArrival}</StyledTableCell>
              <StyledTableCell align="center">{u.EconomyClassSeatsCount}</StyledTableCell>
              <StyledTableCell align="center">{u.BusinessClassSeatsCount}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstClassSeatsCount}</StyledTableCell>

              {/* <StyledTableCell align="center"> <UpdateFlight idd={u._id} from={u.From} to={u.To}
                flightNum={u.FlightNumber}
                date={u.FlightDate}
                arr={u.ArrivalTime}
                dep={u.DepartureTime}
                tdep={u.TerminalDeparture}
                tarr={u.TerminalArrival}
                ec={u.EconomyClassSeatsCount}
                bs={u.BusinessClassSeatsCount}
                first={u.FirstClassSeatsCount}
              /></StyledTableCell> */}
                <StyledTableCell align="center">
                {/* <Button onClick={() =>{navigate("/SelectedFlight");
                localStorage.setItem("flight",JSON.stringify(u))
                }} */}
               <Button variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Select</Button>
                </StyledTableCell>

              </TableRow>
          })}
         
        </Table>
      </TableContainer>
            
            {/* </Modal.Body> */}
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              
            </Modal.Footer> */}
          {/* </Modal> */}
        {/* </> */}

              </form>

               </div>
        
    )
}
export default SelectedFlight;