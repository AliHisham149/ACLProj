import './App.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteFlight from './DeleteFlight';
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
import UserSearchBody from './UserSearchFlight';
// import Login from './Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import Itinerary from './itinerary';

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
  


function GuestUser(){
    let navigate = useNavigate();
    let Logged=localStorage.getItem("loggedin");
    const Check= JSON.parse(Logged);
    const [flightlist, setFlightlist] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:8080/showFlights").then(res => {
        // console.log("xxxx");
        setFlightlist(res.data);
      })
    })

    // function handleClick(){
    //     navigate("/SelectedFlight");
    // }




    return(
<div>
<a   href="/" >Back</a> 



       <TableContainer component={Paper}>
       <h1 className="Website-header" align="center">  </h1>

       <StyledTableCell align="center">
                 
                 <Button onClick={() =>{
                     navigate("/Signup");
                    
                  
                  }}
                variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">SIGN UP NOW</Button>
                 </StyledTableCell>

       <h1 align="center" color="#d89d28">Flights Timetable</h1> 
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


           {flightlist.map(u => {
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

               
               <StyledTableCell align="center">
                 
               <Button onClick={() =>{navigate("/SelectedFlight");
                localStorage.setItem("flight",JSON.stringify(u))
                }}
              variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Select</Button>
               </StyledTableCell>
             </TableRow>
           })}
         
         </Table>
       </TableContainer>
       <br/>
       <h1 align="center" color="#d89d28">Search for your flight</h1> 
       <UserSearchBody></UserSearchBody>

       <h1 align="center" color="#d89d28">Your Reservations</h1>
       {/* <Itinerary></Itinerary>; */}
       <Button onClick={() =>{
              if(Check==true)
               navigate("/itinerary");
                else
                alert("please login first");
                }}
              variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Select</Button>
       
<br/>
       
                   
                  
       
       
       

       


       </div>

)

}

export default GuestUser;






{/* <Popup trigger={<Button onClick={handleClick} variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false">Select</Button>} position="right center"> */}
                   {/* <div>Are you sure you want to delete?(if no click anywhere)</div> */}
                   {/* <DeleteFlight idd={u._id}></DeleteFlight> */}
               {/* </Popup> */}

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