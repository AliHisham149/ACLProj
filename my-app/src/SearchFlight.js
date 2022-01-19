//imports
import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Table from 'react-bootstrap/Table';
import SearchResults from './SearchResults';
import Search from './Search'
function SearchFlight(props) {
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

  const [clicked, setClicked] = useState(false);

  
  useEffect(() => {
    if (clicked) {
      axios.post('http://localhost:8080/searchFlights', {
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
        NuofAvailableFirstSeats: first
      })
        .then(function (response) {
          console.log("xxx");
        })
      setShow(false);
      setClicked(false);
    }
  },[]);

  return (
    <div>
      <Button variant="outline-primary" onClick={handleShow}>
        Search
        <Modal show={show} onHide={handleClose} animation={false} sm='large'>
          <Modal.Header closeButton>
            <Modal.Title>Flights</Modal.Title>
          </Modal.Header>
          <Modal.Body> <div border="solid">
            <Search from={props.from}
              to={props.to}
              date={props.date}
              first={props.first}
              business={props.business}
              economy={props.economy}
              arrival={props.arrival}
              departure={props.departure}
              arrivalTerminal={props.arrivalTerminal}
              departureTerminal={props.departureTerminal}
              flightNumber={props.flightNumber}>

            </Search>



          </div>
          </Modal.Body>
        </Modal>
      </Button>

    </div>
  );
}

export default SearchFlight;
