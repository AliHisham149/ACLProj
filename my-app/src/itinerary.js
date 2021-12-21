import './App.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteReservation from './DeleteReservation';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import AddFlightForm from './AddFlight';
import UpdateFlight from './UpdateFlight';
import SearchBody from './SearchFlight';

// import Flightitinerary from './Iteniary';


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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// function getFlightByNumber(id,flightlist){
//     for(x in flightlist){
//         if(x.FlightNumber == id){
//             return x;
//         }
//     }
// }

function Itinerary() {
  const [flightlist, setFlightlist] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/showFlights").then(res => {
      console.log("xxxx");
      setFlightlist(res.data);
    })
  })

  const [reservationList,setReservationList] = useState([]);
  useEffect(()=>{
      axios.get("http://localhost:8080/getReservations").then(res=>{
          setReservationList(res.data);
      })
  })

  useEffect(()=>{

  })


  return (
    <div>
      <TableContainer component={Paper}>
      <h1 align="center" color="#d89d28">Reservations list</h1> 
        <Table sx={{ minWidth: 500 }} aria-label="customized table" size='m'>
          <TableHead>
            
            <TableRow>
              
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Data of birth</StyledTableCell>

              <StyledTableCell align="center">Dep. Flight No.</StyledTableCell>
              <StyledTableCell align="center">Dep. Flight Seats</StyledTableCell>
              <StyledTableCell align="center">FirstFrom</StyledTableCell>
              <StyledTableCell align="center">FirstTo</StyledTableCell>
              <StyledTableCell align="center">FirstFlightDate</StyledTableCell>
              <StyledTableCell align="center">FirstTerminalDeparture</StyledTableCell>
              <StyledTableCell align="center">FirstTerminalArrival</StyledTableCell>
              <StyledTableCell align="center">FirstDepartureTime</StyledTableCell>
              <StyledTableCell align="center">FirstArrivalTime</StyledTableCell>
              <StyledTableCell align="center">FirstSeatType</StyledTableCell>

              <StyledTableCell align="center">ReturnFlightNumber</StyledTableCell>
              <StyledTableCell align="center">ReturnFlightSeats</StyledTableCell>
              <StyledTableCell align="center">SecondTo</StyledTableCell>
              <StyledTableCell align="center">SecondFrom</StyledTableCell>
              <StyledTableCell align="center">SecondFlightDate</StyledTableCell>
              <StyledTableCell align="center">SecondTerminalDeparture</StyledTableCell>
              <StyledTableCell align="center">SecondTerminalArrival</StyledTableCell>
              <StyledTableCell align="center">SecondDepartureTime</StyledTableCell>
              <StyledTableCell align="center">SecondArrivalTime</StyledTableCell>
              <StyledTableCell align="center">SecondSeatType</StyledTableCell>

              <StyledTableCell align="center">Total Price</StyledTableCell>

              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableRow> </TableRow>


          {reservationList.map(u => {
            return <TableRow key={u._id}>
                <StyledTableCell align="center">{u.Name}</StyledTableCell>
              <StyledTableCell align="center">{u.Email}</StyledTableCell>
              <StyledTableCell align="center">{u.DateOfBirth}</StyledTableCell>

              <StyledTableCell align="center">{u.DepartureFlightNumber}</StyledTableCell>
              <StyledTableCell align="center">{u.DepartureFlightSeats} </StyledTableCell>
              <StyledTableCell align="center">{u.FirstFrom}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstTo}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstFlightDate}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstTerminalDeparture}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstTerminalArrival}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstDepartureTime}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstArrivalTime}</StyledTableCell>
              <StyledTableCell align="center">{u.FirstSeatType}</StyledTableCell>
              
              <StyledTableCell align="center">{u.ReturnFlightNumber}</StyledTableCell>
              <StyledTableCell align="center">{u.ReturnFlightSeats} </StyledTableCell>
              <StyledTableCell align="center">{u.SecondFrom}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondTo}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondFlightDate}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondTerminalDeparture}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondTerminalArrival}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondDepartureTime}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondArrivalTime}</StyledTableCell>
              <StyledTableCell align="center">{u.SecondSeatTypes}</StyledTableCell>

              <StyledTableCell align="center">{u.TotalPrice}</StyledTableCell>
              <StyledTableCell align="center"> </StyledTableCell>
              <StyledTableCell align="center">
                <Popup trigger={<Button variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Cancel</Button>} position="right center">
                  <div>Are you sure you want to cancel?(if no click anywhere)</div>
  {/* Change deleteflight to delete reservation */}
                  <DeleteReservation idd={u._id}></DeleteReservation>
                </Popup>
              </StyledTableCell>
            </TableRow>
          })}
         
        </Table>
      </TableContainer>
        <br/>
      




    </div>);

}

export default Itinerary;
