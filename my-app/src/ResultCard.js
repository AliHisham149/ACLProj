import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlightCard from './FlightCard';
import { useState, useEffect } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CardBody from '@mui/material/Card';
import dateFormat from 'dateformat';
//import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



export default function ResultCard(props) {
  const [details, setDetails] = useState("");
  //const[clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  function setDets() {
    axios.post('http://localhost:8080/getFlightDetails', {

      _id: props.flightID._id,
      cabin: props.cabin,
      childPass: props.child,
      adultPass: props.adult
    })
      .then(function (response) {
        console.log("xxx");

        console.log(response._id);
        console.log(response);
        setDetails(response.data[0]);
        console.log(details);
      });
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box variant="outlined" alignItems="center" sx={{ width:900,  color: '#161342', pr: '20px', mb: '40px', borderColor: 'white', borderRadius: 5, backgroundColor: ' #161342' , opactity:0.9}} style={{width:1100,height:230}}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h6 style={{color:"#FFFFFF",marginLeft:72}}>From:</h6>
            <card alignItems="left" variant="outlined"  ><FlightCard f="departure" time={props.DepartureTime} airport={props.From} flight={props.FlightNu} style={{marginLeft:10}} /></card>
          </Grid>
          <Grid item xs={2}>
            <card alignItems="center" variant="outlined" >
              <CardContent alignItems="center" >

                <AccessTimeIcon sx={{ transform: 'scale(1.5)', mb: '10px', mx: '15px' }} style={{ marginLeft: 50, marginTop: 30 }}></AccessTimeIcon>
                <Typography sx={{ fontSize: 20 }} color="white" style={{ marginLeft: 30 }} gutterBottom>
                 Trip Duration: {props.TripDuration} Hours
                </Typography>

              </CardContent></card>
            <card alignItems="center" variant="outlined" >
              <CardContent alignItems="center" >

              </CardContent></card>
          </Grid>
          <Grid item xs={3}>
          <h6 style={{color:"#FFFFFF",marginLeft:75}}>To:</h6>

            <card alignItems="center" variant="outlined"><FlightCard f="arrival" time={props.ArrivalTime} airport={props.To} flight={props.FlightNu} /></card>
          </Grid>
          <Grid item xs={2}>
            
                  <Typography variant="h6" color=' white' textAlign="center" style={{ fontFamily: 'Verdana', marginTop: 35 }}>
                    Type: {props.cabin}
                  </Typography>
                  <Typography variant="h5" color=' white' textAlign="center" style={{ fontFamily: 'Verdana', marginTop: 10,marginLeft:-55 }}>
                    Ticket price: {props.Price}
                  </Typography> 
                  <Box alignItems="center" variant="outlined" sx={{ ml: '60px' }} >

                  </Box>


              
          </Grid>
          <Button variant="outlined" onClick={(event) => { props.click(true); props.flight(props.flightID) }} style={{ marginTop:-150, marginLeft: 920, height: 40, color: "white", borderColor: "white" , fontSize:10}}>Choose flight</Button>
 
        </Grid>
        <Button onClick={() => { handleClickOpen(); setDets() }}
          style={{ transform: 'scale(0.8)', marginLeft: 870, marginTop: -140, color: "white", borderColor: "white" }}> <text style={{ textDecorationLine: "underline" }}> View Flight Details </text></Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: ' #161342' }}>
            {"Flight Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Flight Date:  {dateFormat(details.FlightDate, "dd/mm/yyyy")}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Flight Number:  {details.FlightNu}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Departure time:  {details.DepartureTime}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Arrival time:  {details.ArrivalTime}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Trip Duration:  {details.TripDuration} Hrs
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Cabin Class:  {details.cabin}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Baggage Allowance:  {details.baggageAllowance}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus style={{ color: 'white', backgroundColor: ' #161342' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
