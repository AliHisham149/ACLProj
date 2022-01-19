import { Typography } from "@mui/material";
import Link from '@mui/material/Link';
import React from "react";
import { AiOutlineArrowRight } from 'react-icons/ai';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom'
function Transacc() {
  const navigate = useNavigate();
  return (

    <div>
      <div>

        <Card sx={{ display: 'flex' }} style={{ width: 1300, height: 350, marginLeft: 100, backgroundColor: '#e0dfdf', opacity: 0.85 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }} style={{ width: 800 }}>
              <Typography component="div" style={{ fontFamily: 'Verdana', color: '#161342', marginTop: 30, fontSize: 20, fontWeight: 'bold' }}>  The Oryx Airport Hotel
              </Typography>
              <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 300, color: ' #161342', width: 200 }} />
              <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 200 }}
                align="left"
                gutterBottom>                            If you are not eligible for complimentary transit accommodation you can still book a room at The Oryx Airport Hotel. Welcoming and convenient,
                The Oryx Airport Hotel  provides you with exceptional facilities and services to relax and rejuvenate while waiting for your next flight.

              </Typography>
              <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 200 }}
                align="left"
                gutterBottom>
                Whether you are traveling for business or leisure, with family or solo, The Oryx Airport Hotel covers all your needs. Your convenience is top priority.
                When transferring or departing, you can check in and out, regardless of your flight schedule. Rooms can be booked for a minimum of five hours.
              </Typography>


            </CardContent>

          </Box>
          <CardMedia
            style={{ marginLeft: 0 }}
            component="img"
            width="900"
            sx={{ width: 900 }}
            image="https://gommts3.mmtcdn.com/htl-imgs/htl-imgs/201603091701085006-be8edeef_z.jpg?&output-quality=75&downsize=520:350&crop=520:350;81,0&output-format=jpg"
            alt="Memberchips"
          />
        </Card>

        <br />








      </div>














    </div>
  )
}

export default Transacc;