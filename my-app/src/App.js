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
import SearchBody from './SearchFlight';
import Login from './Login';
import Admin from './Admin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from './Landing';
// import Routing from './Routing';


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


function App() {
  const [flightlist, setFlightlist] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/showFlights").then(res => {
      // console.log("xxxx");
      setFlightlist(res.data);
    })
  })
  return(
<Landing></Landing>
    
//     <Router>
      
// {/* <Login></Login> */}
//   <Routes>
//       <Route path="/Admin" element={<Admin />} />
//       <Route path="/Login" element={<Login />} />
      
        
//   </Routes>
    
    
    
//     </Router>
    

  )
  

 
}


export default App;