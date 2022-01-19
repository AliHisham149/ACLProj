import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PriceCard from './PriceCard'
import FlightCard from './FlightCard';
import { useState } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import InfoIcon from '@mui/icons-material/Info';
import { id } from 'date-fns/locale';
import CardBody from '@mui/material/Card';
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import { useEffect } from 'react';
export default function Chosen(props) {
  //const [chosen, setChosen] = useState(false);
  //return { chosen, render:(
  const [clicked, setClicked] = useState(false);
  useEffect(()=>
  {
    console.log(props.FlightNu);
    console.log(props.DepartureTime)
    console.log(props.From)

  })
  return (
    <div>
      <Box variant="outlined" alignItems="center" sx={{  color: 'white', pr: '20px', mb: '40px', borderColor: 'white', borderRadius: 5, backgroundColor: ' #161342' }} style={{width:1100,height:200,marginLeft:200}}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <card alignItems="center" variant="outlined"  >
           
              <FlightCard f="departure" time={props.DepartureTime} airport={props.From} flight={props.FlightNu} /></card>
          </Grid>
          <Grid item xs={2}>
            <card alignItems="center" variant="outlined" >
              <CardContent alignItems="center" >

                <AccessTimeIcon sx={{ transform: 'scale(1.5)', mb: '10px', mx: '15px' }} style={{marginTop:30}}></AccessTimeIcon>
                <Typography sx={{ fontSize: 20 }} color="white" gutterBottom>
                  {props.TripDuration}   Hrs
                </Typography>

              </CardContent></card>
            <card alignItems="center" variant="outlined" >
              </card>
          </Grid>
          <Grid item xs={3}>
            <card alignItems="center" variant="outlined">
              <FlightCard f="arrival" time={props.ArrivalTime} airport={props.To} flight={props.FlightNu} /></card>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" color=' white' textAlign="center" style={{ fontFamily: 'Verdana', marginTop: 35 }}>
              <AirlineSeatLegroomNormalIcon style={{ color: 'white', fontSize: 30 }} /> {props.cabin}
            </Typography>
            <Typography variant="h5" color=' white' textAlign="center" style={{ fontFamily: 'Verdana', marginTop: 10, marginLeft: -55 }}>
              <AttachMoneyIcon style={{ color: 'white', fontSize: 30 }} /> {props.Price}  
            </Typography>
          </Grid>
          <Button variant="outlined" onClick={() => { props.click(false); props.flight(null) }} startIcon={<AirplanemodeInactiveIcon />} style={{ marginTop:-100, marginLeft: 920, height: 50, color: "white", borderColor: "white" }}>Cancel FLight</Button>
        </Grid>
      </Box>
    </div>
  );
}
