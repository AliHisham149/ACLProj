import React from 'react'
import { ModalFooter } from 'react-bootstrap';
import './flightseatmap.css';
import Checkbox from '@mui/material/Checkbox';
import App from './App';
import Summary from './Summary'
import EditProfile from './EditProfile';
import Layout from './Layout';
import { CssBaseline } from '@mui/material';
import { Container } from '@material-ui/core';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { TableHead } from '@material-ui/core';
import { Paper } from '@mui/material';
import { TableRow } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import axios from 'axios';
import { styled } from '@mui/system';
import { Table } from '@material-ui/core';
import { TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material';
import { Button } from '@material-ui/core';
import { Stack } from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import { Alert } from 'react-bootstrap';
//import { useState } from 'react';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };





function ChooseSeat(props) {
    const [cabinSeats, setCabinSeats] = useState([]);
    const [temp, setTemp] = useState([]);
    const [mariam, setMariam] = useState([]);
    const [reserved, setReserved] = useState([]);
    const [availableSeatsF, setAvailableSeats] = useState([]);
    const [isReserved, setisReserved] = useState("")
    const [bookClicked, setBookedClicked] = useState(false);
    const [flightId,setFlightId]=useState("");
    const [cabin,setCabin]=useState("");
    const [returnFlight,setReturnFlight]=useState("");
    const [retSeats,setRetSeatsClicked]=useState(false);
    const [summary,setSummaryCicked]=useState(false);
    const [id,setid]=useState(props.id)
    const [seats,setSeats]=useState([]);
    const [depseats,setDepseats]=useState([]);
    const [retseats,setRetSeats]=useState([]);

    useEffect(() => {
    if(props.type== "Departure")
    {
        setFlightId(props.FlightID)
        setReturnFlight(props.retFlightID)
    console.log("DEPPPPPPPPPPP")
    }
    else
    {
        setFlightId(props.retFlightID)
    }
    },[id])

    // const [openSnackBar, setOpenSnackBar] = useState(false);

    // const handleClickSB = () => {
    //     setOpenSnackBar(true);
    // };

    // const handleCloseSB = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpenSnackBar(false);
    // };
    const [checked, setChecked] = useState(true);
const handleCheck=(event,u)=>{
    console.log("hereee");
    console.log(u);
        if (seats.indexOf(u)!=-1){setSeats(seats.push(u))}
       // else{setSeats(seats.filter((x)=>!(x)===u))}
    }
   
    
    //number of adults
    const [noOfAdults, setAduls] = useState({ adults: "" });
    const [noOfChildren, setChildren] = useState({ children: "" });




    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.black,
            //color: theme.palette.common.white,
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

    // var temp = [];
    var x = { name: "", seatResult: false }



    useEffect(() => {
        axios.post("http://localhost:8080/getAvailableCabinSeats", {

            FlightID: id,
            cabin: props.cabin
        }).then(res => {
            console.log("xxxx");
            console.log(props.id);
            setMariam(res.data);
            console.log("arrid is");
            console.log(props.arrid);
        })


    })

  


    // }, [])




















    return (<div>
        {summary? <h1 style={{color:'black'}}> hiiiii</h1>:
        <div>
      
           
        {id===props.id?<h1 style={{color:"black"}}>RETURN FLIGHT SEAT RESERVATION:</h1>:<h1 style={{color:"black"}}>DEPARTURE FLIGHT SEAT RESERVATION:</h1>}
                        {
                            <div>
                                
                                <TableContainer component={Paper} style={{
                                    padding: 0,
                                    margin: 0,
                                    width: 400,
                                    height: 500,
        
                                    marginTop: 700,
                                    backgroundColor: 'gray'
        
                                }} >
                                    <Table stickyHeader sx={{
                                        width: 600,
                                        height: 300
                                    }}
                                        aria-label="customized table" size="small"
                                    >
                                        <TableHead position="fixed" >
                                            <TableRow>
                                                <StyledTableCell align="center" size="small">seats</StyledTableCell>
                                                <StyledTableCell align="center" size="small">Choose Seat</StyledTableCell>
                                                <StyledTableCell align="center" size="small">Book Seat</StyledTableCell>
        
        
                                            </TableRow>
                                        </TableHead>
                                        <TableRow> </TableRow>
        
        
        
        
                                        {mariam.map(u => {
                                            return <TableRow key={u._id}>
                                                <StyledTableCell align="center" size="small">{u}</StyledTableCell>
                                                {/* <StyledTableCell align="center" size="small" checked={checked}> <Checkbox {...label} onChange={handleChange}> </Checkbox></StyledTableCell> */}
                                                <StyledTableCell>
                                                
                                                <Button onClick={(event) => axios.post("http://localhost:8080/reserveSeats", {
                                                            FlightID: id,
                                                            seats: u,
                                                            cabin: props.cabin
        
                                                        }).then(res => {
                                                            console.log("xxxx");
                                                            console.log(u);
                                                        
                                                        })
                                                        } >reserve</Button>
                                                   
                                              
        
                                            </StyledTableCell>
        
                                            </TableRow>
                                        })}
        
                                </Table>
                              { id===props.arrid? <Button onClick={(event)=>{if(id===props.arrid){setSummaryCicked(true)}else
                                   { setid(props.arrid)}}} >Book Departure Flight Seats </Button>:null}
        
                            </TableContainer>
                          
        
                            </div>
        
                        })
        
                 {id===props.arrid?<Button >Next</Button>:null}
        
            ))
        
            </div >
        }
    </div> 
    )
}

export default ChooseSeat