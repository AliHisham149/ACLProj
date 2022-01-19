import React from 'react'

import { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal'

import ModalDialog from 'react-bootstrap/ModalDialog'

import ModalHeader from 'react-bootstrap/ModalHeader'

import ModalBody from 'react-bootstrap/ModalBody'

import ModalFooter from 'react-bootstrap/ModalFooter'

import { Button } from 'react-bootstrap';

import axios from 'axios';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import ViewDetails from './ViewDetails';

//mport Booknow from './Booknow';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import ChooseSeat from './ChooseSeat';







// const StyledTableCell = styled(TableCell)(({ theme }) => ({

//     [`&.${tableCellClasses.head}`]: {

//         backgroundColor: theme.palette.common.black,

//         color: theme.palette.common.white,

//     },

//     [`&.${tableCellClasses.body}`]: {

//         fontSize: 14,

//     },

// }));



// const StyledTableRow = styled(TableRow)(({ theme }) => ({

//     '&:nth-of-type(odd)': {

//         backgroundColor: theme.palette.action.hover,

//     },

//     // hide last border

//     '&:last-child td, &:last-child th': {

//         border: 0,

//     },

// }));









function DepartureList(props) {

    const [flightNum, setFlightNum] = useState("");

    const [from, setFrom] = useState("");

    const [to, setTo] = useState("");

    const [flightlist, setFlightlist] = useState([]);
    const [booknowClicked, setBookNowClicked] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {

        axios.get("http://localhost:8080/searchDepartureFlights").then(res => {

            console.log("xxxx");

            setFlightlist(res.data);

        })





    })

    return (



        < div >

            <Typography gutterBottom component="div">

                {props.flightType}

            </Typography>

           






        </div>

    )

}





export default DepartureList;