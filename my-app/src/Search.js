import React from 'react'
import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DepartureList from './DepartureList';
import Layout from './Layout';
import { Modal } from 'react-bootstrap';
import ChooseSeat from './ChooseSeat';

import { styled } from '@mui/system';

import { Table, TableBody, TableRow, TableHead, TableCell, TableContainer } from '@material-ui/core';

import { tableCellClasses } from '@mui/material';
import { Paper } from '@mui/material';
import ViewDetails from './ViewDetails';











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


function Search() {
  const [flights, setFlights] = useState({ From: "", To: "", departureDate: "", cabin: "", adults: "", child: "" })
  const [retflights, setRetFlights] = useState({ From: "", To: "", departureDate: "", cabin: "", adults: "", child: "", })
  const [flightlist, setFlightlist] = useState([]);
  const [retflightlist, setretFlightlist] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [retdate, setretDate] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchRes, setSearchRes] = useState(false);
  const [cabin, setCabin] = useState("");
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [flightId, setFlightId] = useState("");
  const [confirmClicked, setConirmedClicked] = useState(false);

//dep llist
  useEffect(() => {
    if (!searchClicked) {
      return false;
    }
    if (searchClicked) {
      setFlights({ From: from, To: to, departureDate: date, cabin: cabin, adults: adult, child: child })
      if (flights.from === "") {
        delete flights.from;

      }
      if (flights.to === "") {
        delete flights.to;

      }
      if (flights.departureDate === "") {
        delete flights.date;

      }
      if (flights.cabin == "") {
        delete flights.cabin;

      }
      if (flights.adults === "") {
        delete flights.adults;

      }
      if (flights.child === "") {
        delete flights.child;

      }

      axios.post('http://localhost:8080/searchDepartureFlights', {

        From: flights.From,
        To: flights.To,
        departureDate: flights.departureDate,
        cabin: flights.cabin,
        adults: flights.adults,
        child: flights.child

      })
        .then(function (response) {
          console.log("xxx");

          console.log(response.data._id);
          setFlightlist(response.data);

          console.log(response.data);
          setFlightId(response.data._id);
          setSearchClicked(false)
          setSearchRes(true);
          //setFlightId(response.data._id)
        }

        )
      //  return()=>{setSearchClicked(false)};
    }


    //.catch(err => {console.log(err)});
  });
  //return list
  useEffect(() => {
    if (!searchClicked) {
      return false;
    }
    if (searchClicked) {
      setRetFlights({ From: to, To: from, departureDate: retdate, cabin: cabin, adults: adult, child: child })
      if (retflights.from === "") {
        delete retflights.from;

      }
      if (retflights.to === "") {
        delete retflights.to;

      }
      if (retflights.departureDate === "") {
        delete retflights.departuredate;

      }
      if (retflights.cabin == "") {
        delete retflights.cabin;

      }
      if (retflights.adults === "") {
        delete retflights.adults;

      }
      if (retflights.child === "") {
        delete retflights.child;

      }

      axios.post('http://localhost:8080/searchDepartureFlights', {

        From: retflights.From, To: retflights.To, departureDate: retflights.departureDate, cabin: retflights.cabin, adults: retflights.adults, child: retflights.child

      })
        .then(function (response) {
          console.log("xxx");
          console.log(response.data);
          setretFlightlist(response.data);

          setSearchClicked(false)
          setSearchRes(true);
        }

        )
      //  return()=>{setSearchClicked(false)};
    }


    //.catch(err => {console.log(err)});
  });

  // useEffect(() => {
  //   if (!searchClicked) {
  //     return false;
  //   }
  //   if (searchClicked) {
  //     setFlights({ From: from, To: to, departureDate: date, cabin: cabin, adults: adult, child: child })
  //     if (flights.from === "") {
  //       delete flights.from;

  //     }
  //     if (flights.to === "") {
  //       delete flights.to;

  //     }
  //     if (flights.departureDate === "") {
  //       delete flights.date;

  //     }
  //     if (flights.cabin == "") {
  //       delete flights.cabin;

  //     }
  //     if (flights.adults === "") {
  //       delete flights.adults;

  //     }
  //     if (flights.child === "") {
  //       delete flights.child;

  //     }

  //     axios.post('http://localhost:8080/AddDepartureFlight', {

  //       FlightId: flightId,
  //       departureDate: flights.departureDate,
  //       cabin: flights.cabin,
  //       adultPass: flights.adults,
  //       childPass: flights.child,
  //       cabin: flights.cabin


  //     })
  //       .then(function (response) {
  //         console.log("xxx");

  //         console.log(response.data._id);
  //         setFlightlist(response.data);

  //         console.log(response.data)

  //         setFlightId(response.data._id);
  //         console.log(response.data._id);
  //         setSearchClicked(false)
  //         setSearchRes(true);
  //         //setFlightId(response.data._id)
  //       }

  //       )
  //     //  return()=>{setSearchClicked(false)};
  //   }


  //   //.catch(err => {console.log(err)});
  // });






  return (


    <div>




      < div style={{ marginTop: -700, marginLeft: 100 }}>


        <form >

          <br />
          <TextField
            required
            id="outlined-error"

            style={{ marginRight: 20 }}
            label="From"
            defaultValue=""

            onChange={event => setFrom(event.target.value)}

          />



          <TextField

            required
            id="outlined-error"
            label="Arrival Airport"
            defaultValue=""
            onChange={event => setTo(event.target.value)}





          />
          <br />
          <br />
          <TextField

            required
            id="outlined-error"
            label="Depature Date"
            style={{ marginRight: 20 }}
            defaultValue=""
            onChange={event => setDate(event.target.value)}





          />


          <TextField

            required
            id="outlined-error"
            label="Arrival Date"
            defaultValue=""
            onChange={event => setretDate(event.target.value)}





          />


          <br />
          <br />
          <TextField

            required
            id="outlined-error"
            label=" Number of Adults"
            style={{ marginRight: 20 }}
            defaultValue=""
            onChange={event => setAdult(event.target.value)}





          />


          <TextField

            required
            id="outlined-error"
            label="Number of Children"
            defaultValue=""
            onChange={event => setChild(event.target.value)}





          />
          <br />
          <br />
          <FormControl component="fieldset" style={{ marginLeft: 15 }}>
            <FormLabel component="legend">Cabin</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={event => setCabin(event.target.value)}>
              <FormControlLabel value="Economy" control={<Radio />} label="Economy" />
              <FormControlLabel value="Business" control={<Radio />} label="Business" />
              <FormControlLabel value="First" control={<Radio />} label="First" />

            </RadioGroup>
          </FormControl>
          <br />

          <Button variant="contained" onClick={event => setSearchClicked(true)} style={{ marginLeft: 340, marginTop: -40 }}>Search</Button>

        </form>
        <div>
          <TableContainer component={Paper} style={{ width: 700 }}>

            <Table sx={{ minWidth: 700 }} aria-label="customized table" size='m'>

              <TableHead>

                <TableRow>

                  <StyledTableCell align="center">Flight Number</StyledTableCell>

                  <StyledTableCell align="center">From</StyledTableCell>

                  <StyledTableCell align="center">To</StyledTableCell>

                  <StyledTableCell align="center">Price</StyledTableCell>

                  <StyledTableCell align="center">&nbsp;</StyledTableCell>









                  <StyledTableCell align="center"> &nbsp;</StyledTableCell>

                  <StyledTableCell align="center"></StyledTableCell>

                </TableRow>

              </TableHead>

              <TableRow> </TableRow>



              {flightlist.length ==0? null:flightlist.map(u => {

                return <TableRow key={u._id}>

                  <StyledTableCell align="center" style={{ color: 'black' }}>{u.FlightNu}</StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }}  >{u.From} </StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }}   >{u.To}</StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }} >${u.price}</StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }} ><ViewDetails from={u.From} to={u.To} fnumber={u.FlightNu} arr={u.ArrivalTime} dep={u.DepartureTime} cabin={u.cabin} style={{ marginTop: 10 }}></ViewDetails> </StyledTableCell>

                  <StyledTableCell align="center" ><Button variant='contained' style={{ color: 'black' }} onClick={event => setShow(true)}>BOOK NOW</Button></StyledTableCell>
                  <div style={{ marginTop: 20, marginLeft: 200 }}>
                    <Modal show={show} onHide={handleClose} animation={false} style={{
                      marginLeft: 230,
                      marginTop: 70, width: 1000,
                      height: 800
                    }}>
                      <Modal.Header closeButton>

                        <Modal.Title style={{ color: 'black' }}>{flightlist._id}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ marginLeft: 40, marginTop: 130 }}>
                        <ChooseSeat style={{ marginLeft: 50 }} id={flightId} />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                          Confirm
                        </Button>

                      </Modal.Footer>
                    </Modal>
                  </div>


                </TableRow>

              })}

            </Table>

          </TableContainer>
        </div>
        <div>
          <TableContainer component={Paper} style={{ width: 700 }}>

            <Table sx={{ minWidth: 700 }} aria-label="customized table" size='m'>

              <TableHead>

                <TableRow>

                  <StyledTableCell align="center">Flight Number</StyledTableCell>

                  <StyledTableCell align="center">From</StyledTableCell>

                  <StyledTableCell align="center">To</StyledTableCell>

                  <StyledTableCell align="center">Price</StyledTableCell>

                  <StyledTableCell align="center">&nbsp;</StyledTableCell>









                  <StyledTableCell align="center"> &nbsp;</StyledTableCell>

                  <StyledTableCell align="center"></StyledTableCell>

                </TableRow>

              </TableHead>

              <TableRow> </TableRow>



              {retflightlist.map(u => {

                return <TableRow key={u._id}>

                  <StyledTableCell align="center" style={{ color: 'black' }}>{u.FlightNu}</StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }}  >{u.From} </StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }}   >{u.To}</StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }} >${u.price}</StyledTableCell>

                  <StyledTableCell align="center" style={{ color: 'black' }} ><ViewDetails from={u.From} to={u.To} fnumber={u.FlightNu} arr={u.ArrivalTime} dep={u.DepartureTime} cabin={u.cabin} style={{ marginTop: 10 }}></ViewDetails> </StyledTableCell>

                  <StyledTableCell align="center" ><Button variant='contained' style={{ color: 'black' }} onClick={event => setShow(true)}>BOOK NOW</Button></StyledTableCell>
                  <div style={{ marginTop: 20, marginLeft: 200 }}>
                    <Modal show={show} onHide={handleClose} animation={false} style={{
                      marginLeft: 230,
                      marginTop: 70, width: 1000,
                      height: 800
                    }}>
                      <Modal.Header closeButton>

                        <Modal.Title style={{ color: 'black' }}>{flightlist._id}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ marginLeft: 40, marginTop: 130 }}>
                        <ChooseSeat style={{ marginLeft: 50 }} id={flightId} />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                          Confirm
                        </Button>

                      </Modal.Footer>
                    </Modal>
                  </div>


                </TableRow>

              })}

            </Table>

          </TableContainer>




        </div>



      </div>




    </div >
  )
}

export default Search