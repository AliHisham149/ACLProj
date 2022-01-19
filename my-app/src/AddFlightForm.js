import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, TextField } from '@mui/material';

import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FlightIcon from '@mui/icons-material/Flight';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const moment = require("moment");
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




function AddFlightForm(props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
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
  const [ecPrice, setEcPrice] = useState("");


  const [bs, setBs] = useState("");
  const [bsPrice, setBsPrice] = useState("");
  const [first, setFirst] = useState("");
  const [firstPrice, setFirstPrice] = useState("");
  const [tripDuration, setTripDuration] = useState("");




  const [flightNum, setFlightNum] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };



  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {

      axios.post('http://localhost:8080/addFlight', {
        FlightNu: flightNum,
        From: from,
        To: to,
        FlightDate: date,
        ArrivalTime: arr,
        DepartureTime: dep,
        TerminalDeparture: tdep,
        TerminalArrival: tarr,
        NuofAvailableEconomySeats: ec,
        NuofAvailableBuisnessSeats: bs,
        NuofAvailableFirstSeats: first,
        ecoPrice: ecPrice,
        busPrice: bsPrice,
        FPrice: firstPrice,
        TripDuration:Number(arr.substring(0,2))-Number(dep.substring(0,2))
       
      })
        .then(function (response) {
          console.log("xxx");
          setShow(false);
        }).catch(error => {
          console.log(error.response)
          setError(error.response.data);
        });

      setClicked(false);
    }
  });




  return (
    <>
      <Button onClick={handleShow} variant='primary' style={{ fontFamily: 'Verdana', backgroundColor: '#161342', color: 'white', width: 230, marginLeft: 80, marginTop: 20 }} >

        <FlightIcon /> Click here to add a new flight


      </Button>


      <Modal show={show} onHide={handleClose} animation={false} style={{ height: 600, marginTop: 150 }} >
        <Modal.Header position="fixed" style={{ marginTop: '20', backgroundColor: '#e0dfdf' }} closeButton >
          <Modal.Title style={{ color: '#161342' }}>Add a new flight</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginTop: 20 }}> <div border="solid">




          <form >
            <TextField

              required
              id="outlined-size-small"

              size="small"

              label="Flight Number"
              defaultValue=""
              onChange={event => setFlightNum(event.target.value)}

            />





            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Departure Airport"
              defaultValue=""
              onChange={event => setFrom(event.target.value)}
            />


            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Arrival Airport"
              defaultValue=""
              onChange={event => setTo(event.target.value)}
            />
            <div style={{ width: 220, height: 20, marginLeft: 240, marginTop: -40 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}    >
                <DatePicker
                  label="Departure date"
                  mask="_//_"

                  value={date}
                  style={{ width: 200, marginTop: 20 }}
                  onChange={(newValue) => {
                    setDate(moment(new Date(newValue).toUTCString()).format("YYYY-MM-DDT22:00:00.000") + "Z");
                  }}
                  renderInput={(params) => <TextField {...params} />}

                />
              </LocalizationProvider>
            </div>
            <br />
            <br />

            <TextField

              required
              id="outlined-size-small"
              type="time"
              size="small"
              style={{ width: 220, marginRight: 20 }}

              label="Departure time"
              defaultValue=""
              onChange={event => setDep(event.target.value)}
            />

            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 10 }}
              type="time"
              size="small"
              style={{ width: 220 }}
              label="Arrival time"
              defaultValue=""
              onChange={event => setArr(event.target.value)}
            />



            <br />


            <br />
            <TextField

              required
              id="outlined-size-small"
              type='number'
              size="small"
              label="Departure Terminal"
              defaultValue=""
              onChange={event => setTdep(event.target.value)}
            />



            <TextField

              required
              type='number'
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Arrival Terminal"
              defaultValue=""
              onChange={event => setTarr(event.target.value)}
            />



            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              type='number'
              label="Economy Seats"
              defaultValue=""
              onChange={event => setEc(event.target.value)}
            />


            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              type='number'
              label="Economy Seats Price"
              defaultValue=""
              onChange={event => setEcPrice(event.target.value)}
            />

            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"
              type='number'
              size="small"
              label="Business Seats"
              defaultValue=""
              onChange={event => setBs(event.target.value)}
            />



            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              type='number'
              label="Business Seats Price"
              defaultValue=""
              onChange={event => setBsPrice(event.target.value)}
            />

            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"
              type='number'
              size="small"
              label="First Class Seats"
              defaultValue=""
              onChange={event => setFirst(event.target.value)}
            />



            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              type='number'
              size="small"
              label="First Class Seats Price"
              defaultValue=""
              onChange={event => setFirstPrice(event.target.value)}
            />

            <br />
            <br />
            {/* <TextField

              required
              id="outlined-size-small"
              type='number'
              size="small"
              label="Trip Duration"
              defaultValue=""
              onChange={event => setTripDuration(event.target.value)}
            /> */}
            <p style={{ color: 'red' }}>
              {error}
            </p>




          </form>
        </div></Modal.Body>
        <Modal.Footer style={{ marginTop: 10, backgroundColor: '#e0dfdf' }}  >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{ backgroundColor: '#161342', color: 'white' }} onClick={(event) => setClicked(true)}>
            ADD
          </Button>



        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFlightForm