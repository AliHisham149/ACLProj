import * as React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useState } from 'react';


export default function FlightCard(props) {
   console.log(props.airport)
    return (
        
               <div>
                <Typography variant="h6" color="white" component="div" style={{fontFamily:'Veranda',marginLeft:70,marginTop:25}}>
                 {props.airport}
                </Typography>
                <Typography variant="h6" color="white" style={{fontFamily:'Veranda',marginLeft:70,marginTop:10}} >
                  {props.time}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="white" variant='bold' style={{fontFamily:'Veranda',marginLeft:70,marginTop:5}}>
                  Flight Number:  {props.flight}
                </Typography>
                </div>
    );


}
