import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { Button, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


function UpdateFlight(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [from, setFrom] = useState(props.from);
  const [to, setTo] = useState(props.to);

  const [date, setDate] = useState(props.date);
  const [arr, setArr] = useState(props.arr);
  const [dep, setDep] = useState(props.dep);
  const [tdep, setTdep] = useState(props.tdep);
  const [tarr, setTarr] = useState(props.tarr);
  const [ec, setEc] = useState(props.ec);
  const [bs, setBs] = useState(props.bs);
  const [first, setFirst] = useState(props.first);
  const [ecPrice, setEcPrice] = useState(props.ecPrice);
  const [bsPrice, setBsPrice] = useState(props.bsPrice);
  const [firstPrice, setFirstPrice] = useState(props.firstPrice);
  const [tripDuration, setTripDuration] = useState(props.tripDuration);
  const [error, setError] = useState("");


  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      axios.post('http://localhost:8080/updateFlights', {
        _id: props.idd,
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
        EcoPrice: ecPrice,
        BusPrice: bsPrice,
        FPrice: firstPrice,
        TripDuration: tripDuration
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

    //.catch(err => {console.log(err)});
  })
  return (
    <>

      <IconButton size="small" onClick={handleShow}> <EditIcon /></IconButton>

      <Modal show={show} onHide={handleClose} animation={false} style={{ height: 500, marginTop: 150 }}>
        <Modal.Header style={{ marginTop: '20', backgroundColor: '#e0dfdf' }} closeButton>
          <Modal.Title style={{ color: '#161342' }}>Flight Number:{props.flightNum}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div border="solid">




          <form >


            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Departure Airport"
              defaultValue={props.from}
              onChange={event => setFrom(event.target.value)}
            />


            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Arrival Airport"
              defaultValue={props.to}
              onChange={event => setTo(event.target.value)}
            />

            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Date"
              defaultValue={props.date}
              onChange={event => setDate(event.target.value)}
            />

            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Departure time"
              defaultValue={props.dep}
              onChange={event => setDep(event.target.value)}
            />


            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Arrival time"
              defaultValue={props.arr}
              onChange={event => setArr(event.target.value)}
            />

            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Departure Terminal"
              defaultValue={props.tdep}

              onChange={event => setTdep(event.target.value)}
            />

            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Arrival Terminal"
              defaultValue={props.tarr}
              onChange={event => setTarr(event.target.value)}
            />


            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Economy Seats"
              defaultValue={props.ec}
              onChange={event => setEc(event.target.value)}
            />


            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Economy Seats Price"
              defaultValue={props.ecPrice}
              onChange={event => setEcPrice(event.target.value)}
            />

            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="Business Seats"
              defaultValue={props.bs}
              onChange={event => setBs(event.target.value)}
            />


            <br />
            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="Business Seats Price"
              defaultValue={props.bsPrice}
              onChange={event => setBsPrice(event.target.value)}
            />


            <TextField

              required
              id="outlined-size-small"
              style={{ marginLeft: 15 }}
              size="small"
              label="First Class Seats"
              defaultValue={props.first}
              onChange={event => setFirst(event.target.value)}
            />


            <br />

            <br />
            <TextField

              required
              id="outlined-size-small"

              size="small"
              label="First Class Seats Price"
              defaultValue={props.firstPrice}
              onChange={event => setFirstPrice(event.target.value)}
            />


            
            <br />
            <p style={{ color: 'red' }}>
              {error}
            </p>
          </form>
        </div></Modal.Body>
        <Modal.Footer position="fixed" style={{ marginTop: 10, backgroundColor: '#e0dfdf' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{ backgroundColor: '#161342', color: 'white' }} onClick={(event) => setClicked(true)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateFlight
