import React from 'react'
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DepartureList from './DepartureList';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { Button } from 'react-bootstrap';
import logo from './logo.svg'
import { styled } from '@mui/system';
import { TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material';
import { TableRow } from '@material-ui/core';
import axios from 'axios';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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


function ViewDetails(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [flightNu, setfllightnu] = useState(props.FlightNu);
    const [from, setFrom] = useState(props.from);
    const [to, setTo] = useState(props.to);
    const [dep, setDep] = useState(props.dep);
    const [arr, setArr] = useState(props.arr);
    const [tripdur, settripdur] = useState(props.tripdur);
    const [cabin, setcabin] = useState(props.cabin);
    const [bagallow, setbagallow] = useState(props.bagallow);
    const [flightlist, setFlightlist] = useState([]);
    const [clicked, setClicked] = useState(false);

    // useEffect(() => {
    //     if (clicked) {
    //         axios.post('http://localhost:8080/detailsofaflight', {
    //             _id: props.idd,
    //             FlightNumber: flightNu,
    //             From: from,
    //             To: to,
    //             DepartureTime: dep,
    //             ArrivalTime: arr,
    //             TripDuration: tripdur,
    //             CabinClass: cabin,
    //             BagAllowance: bagallow



    //         })
    //             .then(function (response) {
    //                 console.log("xxx");
    //             })
    //         setShow(false);
    //         setClicked(false);
    //     }


    // })



    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}> View Details</Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Flight Number:{props.flightNum}</Modal.Title>
                </Modal.Header>
                <Modal.Body> <div border="solid">




                    <form style={{ color: "black" }}>

                        <br />
                        Flight Number:{props.fnumber}
                        <br />

                        <br />
                        From: {props.from}
                        <br />

                        <br />
                        To: {props.to}
                        <br />

                        <br />

                        ArrivalTime:{props.arr}

                        <br />

                        <br />
                        Departure Time:{props.dep}
                        <br />




                        <br />
                        Cabin Class:First/Buisness/Economy
                        <br />

                        <br />
                        Bag Allowance:100kg

                        <br />



                        <br />

                    </form>
                </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewDetails;