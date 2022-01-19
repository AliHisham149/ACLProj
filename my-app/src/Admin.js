import logo from './logo.svg';
import './App.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import DeleteIcon from '@mui/icons-material/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteFlight from './DeleteFlight';
import SearchFlight from './SearchFlight';
//import AddFlightForm from './AddFlightForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from '@mui/material/styles';

import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UpdateButton from './UpdateButton'
import ButtonBase from '@mui/material/ButtonBase';
import { MDBCol, MDBIcon } from "mdbreact";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Icon from '@mui/material/Icon';
import { Button, Card } from 'react-bootstrap';
import AddFlightForm from './AddFlightForm';
import UpdateFlight from './UpdateFlight';

import Box from '@mui/material/Box';

import { Stack } from 'react-bootstrap';

import { AppBar } from '@mui/material';
import { Container } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

import IconButton from '@mui/material/IconButton';

import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { Chart, ArcElement } from 'chart.js'


import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import SearchResults from './SearchResults';
// import { StyleSheet, View } from 'react-native';
// import WeatherChart from 'react-native-weather-chart';
import DeleteIcon from '@mui/icons-material/Delete';

Chart.register(ArcElement);




const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const state = {
  monthlabels: ['Total', 'Completed', 'Inprogress',
    'Pending'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#5DADE2',
        '#1ABC9C',
        '#F1948A ',
        '#2E4053 ',
        '#6800B4'
      ],
      hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
      ],
      data: [65, 59, 90, 81]
    }
  ]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#161342',
    color: theme.palette.common.white,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 3,
    backgroundColor: '#e0dfdf',
    width: 20

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#e0dfdf',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: ['100k', '50k', '200k', '200k', '400k', '300k'],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));




const images = [
  {
    label: 'On board flights',
    imgPath:
      'https://media.istockphoto.com/vectors/plane-routes-over-world-map-with-markers-or-map-pointers-travel-by-vector-id1067310870',
  },
  {
    label: 'Flight schedule',
    imgPath:
      'https://ak.picdn.net/shutterstock/videos/15926962/thumb/6.jpg',
  },
  {
    label: 'Exchange rate',
    imgPath:
      'https://hospitalityinsights.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/exchange%20rate.jpeg',
  },
  {
    label: 'Special offers',
    imgPath:
      'https://www.moneysavingexpert.com/content/dam/mse/editorial-image-library/guide-images/hero-images/hero-travel-cheap-flights.jpg',
  },
];

const adminImages = [
  {
    url: 'https://www.sabre.com/wp/wp-content/uploads/shutterstock_360709013-e1466022080737-720x415.jpg',
    title: 'Tickets ',
    width: '25%',
  },
  {
    url: 'https://i2.wp.com/www.elegantthemes.com/blog/wp-content/uploads/2021/04/add-new-user-wordpress.jpg?ssl=1',
    title: 'New users',
    width: '25%',
  },
  {
    url: 'https://expresswriters.com/wp-content/uploads/2020/04/blogging-statistics-header.jpg',
    title: 'Current stats',
    width: '25%',
  },
];
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


const Data = {
  values: [23, 24, 25, 20, 15],
  textBottom: ['23°', '24°', '25°', '20°', '15°'],
  iconBottom: ['DayCloudy', 'DaySunny', 'DaySunny', 'DayCloudy', 'DayRain'],
};

const Settings = {
  showTextTop: false,
  showTextBottom: true,
  showIconTop: false,
  showIconBottom: true,
};

const generateData = (start, end, step) => {
  const data = [];
  for (let i = start; i < end; i += step) {
    data.push({ splineValue: Math.sin(i) / i, lineValue: ((i / 15) ** 2.718) - 0.2, argument: i });
  }

  return data;
};


function Admin() {

  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);

  const [flightlists, setFlightlists] = useState([]);
  //const [logoutClicked, setLogoutClicked] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/showFlights").then(res => {
      console.log("xxxx");
      setFlightlists(res.data);
    })


  })
  const [openList, setOpenList] = useState(true);

  const handleClickList = () => {
    setOpenList(!openList);
  };
  const [logoutClicked, setlogOutClicked] = useState(false);
  const handleLogout = () => {
    setlogOutClicked(true);
    handleCloseNavMenu();
  };
  const [editProfile, setEditProfileClicked] = useState(false);
  const handleEditProfile = () => {
    setEditProfileClicked(true);
    handleCloseNavMenu();
  };

  //navbar
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //back button
  const [backButton, setBackButton] = useState(false);

  //buttom navigation
  const [bottomvalue, setBottomValue] = useState('recents');

  const handleChangeBNav = (event, newValue) => {
    setBottomValue(newValue);
  };
  // const [date, setDate] = React.useState(new Date());



  ///search body
  const [flights, setFlights] = useState({ from: "", to: "", date: "", arr: "", dep: "", tdep: "", tarr: "", ec: "", bs: "", first: "", flightNum: "" })
  const [flightlist, setFlightlist] = useState([]);
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
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchRes, setSearchRes] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [value, setValue] = React.useState(new Date());

  return (
    <div>
                  <AppBar position="fixed" style={{ width: "1600px", backgroundColor: '#161342',opacity:1,height:"70px" }} color='transparent'    >

<Container maxWidth="xl">
    <Toolbar disableGutters>

        <Stack direction="row" spacing={6} style={{ marginLeft: 200 }}>
            <h1> &nbsp; &nbsp;&nbsp;&nbsp; NO WAY HOME AIRLINES</h1>
            <Box style={{ marginLeft: 1000 }} >
                <h5 style={{marginTop:-45}}>Welcome Admin</h5>
            </Box>
            <Box>
            <Button style={{color:"white",marginTop:-95,marginLeft:1200}}variant="outlined" onClick={() => {
                                    navigate("/")
                                    localStorage.clear();
                                }}>
                                    <AccountCircleIcon />
                                    Logout
                                </Button>
            </Box>
        </Stack>

    </Toolbar>
</Container>
</AppBar>

    <div style={{ width: 600 }}>
      
      {
        <div style={{ marginTop: 1200, marginLeft: -200 }}>

          <Box>


            {searchClicked ? <SearchResults flightlist={flightlist} /> :
              <div style={{
                position: 'center',
                width: 1000,
                height: 500,
                right: 900,
                top: 900
              }} backgroundColor="white">




                <br />
                <br />

              </div>
            }
          </Box>
          




         
            



          <Card style={{ width: 945, marginLeft: 0, marginTop: -700, backgroundColor: '#ffffff', height: 600 }}>
            <div

              id='intro-example'
              className='p-5 text-center bg-image'
              style={{
                backgroundSize: "contain", backgroundRepeat: "repeat", height: 0, width: 945, backgroundColor: " #161342",
                marginTop: 0, marginLeft: 0

              }}


            >
              <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#ffffff', fontSize: 25, marginLeft: -20, marginTop: -20 }} >Search available flights </h3>
            </div>
            <form >
              <br />
              <TextField
                style={{ marginLeft: 50,width:400 }}

                required
                id="outlined-error"
                label="Flight Number"
                defaultValue=""
                onChange={event => setFlightNum(event.target.value)}

              />

              <TextField style={{ marginLeft: 60,width:400 }}

                required
                id="outlined-error"
                label="Date"
                defaultValue=""
                onChange={event => setDate(event.target.value)}

              />

              <br />


              <br />

              <TextField
                style={{ marginLeft: 50,width:400 }}

                required
                id="outlined-error"
                label="Depature Airport"
                defaultValue=""
                onChange={event => setFrom(event.target.value)}
              />




              <TextField

                style={{ marginLeft: 60,width:400 }}
                required
                id="outlined-required"
                label="Arrival Airport"
                defaultValue=""
                onChange={event => setTo(event.target.value)}

              />


              <br />

              <br />


              <TextField
                style={{ marginLeft: 50 ,width:400}}
                required
                id="outlined-required"
                label="Departure Terminal"
                defaultValue=""
                onChange={event => setTdep(event.target.value)}

              />
              <TextField
                style={{ marginLeft: 60,width:400 }}
                required
                id="outlined-required"
                label="Arrival Terminal"
                defaultValue=""
                onChange={event => setTarr(event.target.value)}

              />


              <br />

              <br />




              <TextField
                style={{ marginLeft: 50 ,width:400}}
                required
                id="outlined-required"
                label="Depature Time"
                defaultValue=""
                onChange={event => setDep(event.target.value)}

              />
              <TextField
                style={{ marginLeft: 60 ,width:400}}
                required
                id="outlined-required"
                label="Arrival Time"
                defaultValue=""
                onChange={event => setArr(event.target.value)}

              />

              <br />

              <br />
              <TextField
                style={{ marginLeft: 50 ,width:400}}
                required
                id="outlined-required"
                label="Economy Seats"
                defaultValue=""
                onChange={event => setEc(event.target.value)}

              />


              <TextField
                required
                style={{ marginLeft: 60 ,width:400}}
                id="outlined-required"
                label="Business Seats"
                defaultValue=""
                onChange={event => setBs(event.target.value)}

              />

              <br />

              <br />
              <TextField
                style={{ marginLeft: 50,width:400 }}
                required
                id="outlined-required"
                label="First Seats"
                defaultValue=""
                onChange={event => setFirst(event.target.value)}

              />

              <br />
             

              <Button variant="contained" style={{ position: 'center', marginLeft: 619, marginTop: -90, color: 'white', backgroundColor: ' #161342', width:200,height:50 }} onClick={(event) => { navigate("/SearchResults", { state: { from: from, to: to, date: date, arr: arr, dep: dep, tdep: tdep, tarr: tarr, ec: ec, bs: bs, first: first, flightNum: flightNum, } }); }}>
                Search
              </Button>

            </form>

          </Card>
          <br />
          <br />
          

         
          <br />
          <br />
          <br />
          <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342', fontSize: 30, marginLeft: 50, marginTop: 0 }} >Current flights schedule </h3>
          <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 150, color: ' #161342', width: 200 }} />
          <br />
          <TableContainer component={Paper} style={{
            padding: 0,
            margin: 0,
            width: 950,
            height: 400,
            marginLeft: 0,
            marginTop: -20,
            opacity: 0.87

          }} >
            <Table stickyHeader sx={{
              width: 500,
              height: 50
            }}
              aria-label="customized table" size="small"
            >
              <TableHead position="fixed" >
                <TableRow>
                  <StyledTableCell align="center" size="small">Flight Number</StyledTableCell>
                  <StyledTableCell align="center" size="small">Departure Airport</StyledTableCell>
                  <StyledTableCell align="center">Arrival Airport</StyledTableCell>
                  <StyledTableCell align="center">Flight Date&nbsp; </StyledTableCell>
                  <StyledTableCell align="center">Departure Time</StyledTableCell>
                  <StyledTableCell align="center">Arrival time&nbsp; </StyledTableCell>


                  <StyledTableCell align="center">Departure Terminal</StyledTableCell>
                  <StyledTableCell align="center">Arrival Terminal</StyledTableCell>
                  <StyledTableCell align="center">Seats </StyledTableCell>
                  <StyledTableCell align="center"> Seats price</StyledTableCell>

                  <StyledTableCell align="center">&nbsp; </StyledTableCell>
                  <StyledTableCell align="center">&nbsp; </StyledTableCell>









                </TableRow>
              </TableHead>
              <TableRow> </TableRow>



              {flightlists.map(u => {
                return <TableRow key={u._id}>
                  <StyledTableCell align="center" size="small">{u.FlightNu}</StyledTableCell>
                  <StyledTableCell align="center">{u.From} </StyledTableCell>
                  <StyledTableCell align="center">{u.To}</StyledTableCell>
                  <StyledTableCell align="center">{u.FlightDate}</StyledTableCell>
                  <StyledTableCell align="center">{u.DepartureTime}</StyledTableCell>
                  <StyledTableCell align="center">{u.ArrivalTime}</StyledTableCell>


                  <StyledTableCell align="center">{u.TerminalDeparture}</StyledTableCell>
                  <StyledTableCell align="center">{u.TerminalArrival}</StyledTableCell>
                  <StyledTableCell align="center"> E ({u.NuofAvailableEconomySeats}) B({u.NuofAvailableBuisnessSeats}) F({u.NuofAvailableFirstSeats})</StyledTableCell>
                  <StyledTableCell align="center"> E( ${u.EcoPrice}) B(${u.BusPrice}) F(${u.FPrice})</StyledTableCell>
                  <StyledTableCell align="center"> <UpdateFlight idd={u._id} from={u.From} to={u.To}
                    flightNum={u.FlightNu}
                    date={u.FlightDate}
                    arr={u.ArrivalTime}
                    dep={u.DepartureTime}
                    tdep={u.TerminalDeparture}
                    tarr={u.TerminalArrival}
                    ec={u.NuofAvailableEconomySeats}
                    bs={u.NuofAvailableBuisnessSeats}
                    first={u.NuofAvailableFirstSeats}
                    bsPrice={u.BusPrice}
                    ecPrice={u.EcoPrice}
                    firstPrice={u.FPrice}
                    tripDuration={u.TripDuration}
                  />
                    <br />

                    <Popup trigger={<IconButton variant="outline-danger" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false"><DeleteIcon /></IconButton>} position="right center">
                      <div>Are you sure you want to delete?(if no click anywhere)</div>
                      <DeleteFlight idd={u._id}></DeleteFlight>
                    </Popup>



                  </StyledTableCell>

                </TableRow>
              })}
            </Table>
          </TableContainer>
          <br />
          <br />
          <Card style={{ width: 400, backgroundColor: '#e0dfdf', height: 200, marginLeft: 500, marginTop: 0 }}>
            <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342', fontSize: 25, marginLeft: 125, marginTop: 20 }} >Add Flight </h3>

            <AddFlightForm style={{ marginLeft: 30 }} />
            <hr />

          </Card>
          <br />
          {/* <Card style={{ width: 400, backgroundColor: '#e0dfdf', height: 300,marginLeft:1000}}>
           <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342', fontSize: 20, marginLeft: 90, marginTop: 20 }} >Tickets Overview </h3>
            <Doughnut
              style={{ marginTop: -10, width: 230, marginLeft: 80 }}
              data={state}
              options={{
                title: {
                  display: true,
                  text: 'Total tickets',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            /> 
          </Card> */}

        </div >}
    </div>
    </div>

  );

}

export default Admin;