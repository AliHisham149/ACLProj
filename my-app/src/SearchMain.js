import React from 'react'

//import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
import Layout from './Layout';
import BerlinPic from './images/BerlinPic.jpg'
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import SearchResultsu from './SearchResultsu';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';
//import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ReturnFlight from './ReturnFlight';
//import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/Select';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ButtonGroup } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';

import MobileStepper from '@mui/material/MobileStepper';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea, CardActions } from '@mui/material';

import { styled } from '@mui/material/styles';

import ButtonBase from '@mui/material/ButtonBase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SearchBody(props) {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };




    const [flights, setFlights] = useState({ from: "", to: "", date: "", arr: "", dep: "", tdep: "", tarr: "", ec: "", bs: "", first: "", flightNum: "", retDate: "", searchRes: false })
    const [flightlist, setFlightlist] = useState([]);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [value, setValue] = useState([null, null]);
    const [dates, setdates] = useState([null, null]);
    const moment = require('moment')


    const [date, setDate] = useState("");
    const [retDate, setretDate] = useState("");
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
    const [flightlistRet, setFlightlistRet] = useState({});
    const [ret, setRet] = useState(false);
    const { retflights, render } = ReturnFlight({ from: from, to: to, searchClicked: ret });
    // do not forget to bind getData in constructor
    const [cabin, setCabin] = useState("Economy");
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:8080/showFlights").then(res => {
            console.log(res.data);
            // setFlightlist(res.data); 
            const temp = res.data.map((u) => u.From)
            let uniqueChars = temp.filter((c, index) => {
                return temp.indexOf(c) === index;
            });
            setFlightlist(uniqueChars);

            // res.data.map((u) => {{setFlightlist(flightlist=>[...flightlist,u.From]);}})
            //setFlightlist(  flightlist.filter((u,index) =>{return  flightlist.indexOf(u) === index}))
            console.log(flightlist);
        })


    }, [])
    //snack bar
    const [openSnack, setOpenSnack] = useState(false);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div >


            {flights.searchRes ? <SearchResultsu flights={flights} date={retDate} type="Departure" /> : <div>

                <div style={{ marginLeft: 390, width:915}}>
                    <div style={{marginLeft:-250,color:"#161342"}}>
                        <h1> WELCOME TO NO WAY HOME AIRLINES<br/>  TRAVEL WITH PEACE OF MIND WHEN YOU FLY</h1>
                       
                    </div>
                    <Paper elevation={6} style={{ width: 1200, height: 325, marginLeft: -333, backgroundColor: '#FFFFFF', opacity: 0.95, marginTop: 0 }}>
                        <div

                            id='intro-example'
                            className='p-5 text-center bg-image'
                            style={{
                                backgroundSize: "contain", backgroundRepeat: "repeat", height: 5, width: 1200, backgroundColor: " #161342",
                                marginTop: 20, marginLeft: 0

                            }}


                        >
                            <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#ffffff', fontSize: 30, marginLeft: -20, marginTop: -20 }} >FIND A FLIGHT</h3>
                        </div>
                        <form>
                            <TextField
                                label="From"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}

                                onChange={event => setFrom(event.target.value)}
                                style={{ width: 200, marginLeft: 30, marginTop: 60, marginRight: -10 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"> </InputAdornment>,
                                }}
                            />
                            <CompareArrowsIcon style={{ color: "black", marginTop: 70, marginLeft: 20, marginRight: 20 }} />
                            <TextField
                                label="To"

                                sx={{ m: 1, width: '25ch' }}
                                style={{ width: 200, marginTop: 60, marginLeft: -10 }}
                                onChange={event => setTo(event.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"> </InputAdornment>,
                                }}
                            />
                            <Button aria-describedby={id} variant="outlined" onClick={handleClick} sx={{ m: 1, minWidth: 300 }} style={{ width: 200, height: 60, marginLeft: 519, marginTop: -107, fontSize: 12 }}>
                                {Number(adult) + Number(child)}passenger(s),{cabin}<ArrowDropDownIcon />
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',

                                }}>
                                <div
                                    style={{
                                        width: '400px',
                                        height: '350px'
                                    }}
                                >
                                    <table>
                                        <tr>
                                            <Typography style={{ color: '#161342', fontweight: 'bold', fontSize: 20, marginLeft: 15, marginTop: 10 }}>
                                                Passengers
                                            </Typography>


                                            <td>
                                                {}
                                                <Stack direction='row' spacing={1} >
                                                    <Typography style={{ color: '#808294', fontweight: 'bold', fontSize: 16, marginLeft: -305, marginTop: 55 }}>
                                                        Adult(12+ years)
                                                    </Typography>
                                                    <Button style={{ width: 5, marginLeft: 25, backgroundColor: '#161342', color: 'white', height: 35, marginTop: 50 }} onClick={() => setAdult(adult + 1)}>+</Button>
                                                    <Input type=" number" style={{ width: 15, marginLeft: 15, position: 'center' }} />
                                                    <Button style={{ width: 5, marginLeft: 10, backgroundColor: '#161342', color: 'white', height: 35, marginTop: 50 }}>-</Button>
                                                </Stack>
                                            </td>
                                        </tr>


                                        <Stack direction='row' spacing={1} >
                                            <Typography style={{ color: '#808294', fontweight: 'bold', fontSize: 16, marginLeft: 30, marginTop: 50 }}>
                                                Child
                                            </Typography>
                                            <Button style={{ width: 5, marginLeft: 100, backgroundColor: '#161342', color: 'white', height: 35, marginTop: 50 }} onClick={() => setChild(child + 1)}>+</Button>
                                            <Input type=" number" style={{ width: 15, marginLeft: 15, position: 'center' }} />
                                            <Button style={{ width: 5, marginLeft: 10, backgroundColor: '#161342', color: 'white', height: 35, marginTop: 50 }}>-</Button>
                                        </Stack>
                                        <td>
                                            {/* <TextField
                                                    label=""
                                                    type="number"
                                                    id="outlined-start-adornment"
                                                    sx={{ m: 1, width: '10ch', height: '3ch', marginTop: 3, marginBottom: 3 }}
                                                    onChange={event => setChild(event.target.value)}
                                                /> */}
                                        </td>
                                        <br />

                                        <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 50, color: ' #161342' }} />
                                        < Divider sx={{ m: 1, width: '200%', marginTop: 3, marginBottom: 3 }} />
                                        <tr>
                                            <Typography style={{ color: '#808294', fontweight: 'bold', fontSize: 16, marginLeft: 30 }}>
                                                Cabin class:
                                            </Typography>
                                            <td>
                                                <FormControl sx={{ m: 1, minWidth: 180 }} style={{ marginLeft: -150 }}>
                                                    <InputLabel id="demo-simple-select-required-label"></InputLabel>
                                                    <NativeSelect
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        style={{ width: 200 }}
                                                        value={cabin}
                                                        label="cabin"
                                                        onChange={event => setCabin(event.target.value)}
                                                    >
                                                        <MenuItem value="Economy">Economy </MenuItem>
                                                        <MenuItem value="Business">Business  </MenuItem>
                                                        <MenuItem value="First">First  </MenuItem>


                                                    </NativeSelect>
                                                </FormControl>
                                            </td>
                                        </tr>
                                    </table>

                                </div>
                            </Popover>


                            <br />
                            <div style={{ marginLeft: 750, marginRight: 20, width: 200, marginTop: -88, color:'#161342', borderBlockColor:"#161342", borderBlockEndColor:'#161342' }}>

                                <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                    <DatePicker
                                        
                                                 // label="Return date"
                                        value={date}
                                        style={{ width: 50, marginTop: 30, backgroundColor: 'black' ,color:'#161342' ,borderBlockColor:"#161342" , borderBlockEndColor:"#161342"}}
                                        onChange={(newValue) => {
                                            setDate(moment(new Date(newValue).toUTCString()).format("YYYY-MM-DDT22:00:00.000") + "Z");
                                        }}
                                        renderInput={(params) => <TextField {...params} />}

                                    />
                                </LocalizationProvider>
                            </div>
                            <div style={{ width: 200, marginLeft: 980, marginTop: -57 , color:"#161342"}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        // label="Return date"
                                        mask="_//_"
                                        BorderColor="blue"
                  
                                        sx={{ m: 1, width: '25ch' }}
                                        value={retDate}
                                        onChange={(newValue) => {
                                            setretDate(moment(new Date(newValue).toUTCString()).format("YYYY-MM-DDT22:00:00.000") + "Z");//new Date(new Date(newValue).toUTCString()).toISOString()
                                        }}// moment(new Date(newValue).toUTCString()).format("YYYY-MM-DDT00:00:00.000") + "Z"
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <Button variant="contained" style={{ position: 'center', marginLeft: 500, marginTop: 40, backgroundColor: '#161342', color: 'white', width: 200, height: 45 }} onClick={(event) => {

                                navigate("/SearchRes", { state: { flights: { from: from, to: to, date: date, arr: arr, dep: dep, tdep: tdep, tarr: tarr, ec: ec, bs: bs, first: first, flightNum: flightNum, retDate: "", searchRes: true }, cabin: cabin, adultPass: adult, childPass: child } });
                            }}>
                                Search
                            </Button>


                        </form>
                    </Paper>
                    {/* <h1 style={{marginLeft:90,color:"black"}}>  Search your flight:  <CompareArrowsIcon/><br/>Departure Flight</h1> */}

                </div>
             
                

               






              


            </div >

            }  )


        </div >
    )
}

export default SearchBody