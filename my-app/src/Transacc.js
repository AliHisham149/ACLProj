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
import trasnit from './images/trasnit.jpg'
function Transacc() {
  const navigate = useNavigate();
  return (

    <div
      id='intro-example'
      className='p-5 text-center bg-image'
      style={{
        marginTop: -300,

        background: `url(${trasnit})`, backgroundSize: "contain", backgroundRepeat: "repeat", height: 600, width: window.screen.width
      }}
    >
      <div>
        <Typography style={{ fontSize: 35, fontFamily: 'Verdana', marginTop: 270, color: 'white', marginLeft: 70, fontWeight: 'bold' }}

          align="left"
          gutterBottom
        >

          Transit accommodation


        </Typography>

        <Typography style={{ fontSize: 20, fontFamily: 'Verdana', fontWeight: "bold", marginTop: 250, marginLeft: 50, color: ' #161342' }}

          align="left"
          gutterBottom
        >
          <Link style={{ color: '#161342', marginLeft: 40 }} href="#" onClick={()=> navigate("/Search")}>Home</Link> > Transit accommodation

        </Typography>
        <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 0, color: ' #161342' }} />

        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 110 }}
          align="left"
          gutterBottom>


          In some cases, BSB Airways will arrange accommodation,
          entry visas, airport transfers and meals for passengers facing extended transit times in Egypt.

        </Typography>
        <br />
        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 110, fontWeight: 'bold' }}
          align="left"
          gutterBottom>


          This service may be available if all the following conditions apply:

        </Typography>
        <br />
        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>


          <AiOutlineArrowRight />There is no connection of less than eight hours available;
        </Typography>
        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>


          <AiOutlineArrowRight />The transit time is between eight and 24 hours;
        </Typography>
        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>

          <AiOutlineArrowRight />The booking does not include flights to or from Kuwait (KWI) or Muscat (MCT).
        </Typography><br />
        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>


          For bookings made within 72 hours of departure, transit hotel accommodation cannot be pre-booked. In cases where your ticket is booked within 72 hours

        </Typography>


        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>

          from your arrival,please proceed to the transfer desk when you arrive at the Airport to arrange your transit accommodation.        </Typography>


        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>


          Transit accommodation is at the discretion of BSB Airways. Not all fares are eligible for this stopover service.
        </Typography>


        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120 }}
          align="left"
          gutterBottom>



          Please contact us to confirm whether this service is available for your journey. Charges may apply.        </Typography>


        <Typography component="div" style={{ fontFamily: 'Verdana', color: ' #161342', marginTop: 10, fontSize: 15, marginLeft: 120, fontWeight: 'bold' }}
          align="left"
          gutterBottom>


          *Note: Due to COVID-19 restrictions, Stopover for the Purpose of Connection (STPC) is currently suspended        </Typography>
        <br />
        <br />


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