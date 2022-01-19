import React from 'react'

//import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
import Layout from './Layout';

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
import search from './images/search.jpg'
import cappadocia from './images/cappadocia.jpg'
import { ButtonGroup } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import homepage from './images/homepage.jpg'
import { Card } from 'react-bootstrap';
import homepagee from './images/homepagee.jpg'
import { useTheme } from '@mui/material/styles';

import MobileStepper from '@mui/material/MobileStepper';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea, CardActions } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import LuggageIcon from '@mui/icons-material/Luggage';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HotelIcon from '@mui/icons-material/Hotel';
import CarRentalIcon from '@mui/icons-material/CarRental';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import WifiIcon from '@mui/icons-material/Wifi';
import { Container } from '@material-ui/core';
import logo from './images/logo.png'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import FlightIcon from '@mui/icons-material/Flight';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import IconButton from '@mui/material/IconButton';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LockIcon from '@mui/icons-material/Lock';
import { useLocation } from 'react-router-dom';
import ReservedFlights from './ReservedFlights'
//import { useNavigate } from 'react-router-dom';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: ' #161342',
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



const imagesAni = [
    {
        label: 'Barcelona,Spain',
        imgPath:
            'https://img.static-af.com/images/meta/IDname/CITY-BCN-1?aspect_ratio=1:1&max_width=1280',
    },
    {
        label: 'New York City,United States',
        imgPath:
            'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1800&h=900&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F02%2F19%2Fnew-york-city-evening-NYCTG0221.jpg',
    },
    {
        label: 'Alps, Switzerland',
        imgPath:
            'https://media.istockphoto.com/photos/zermatt-village-with-view-of-matterhorn-in-the-swiss-alps-picture-id486574518?k=20&m=486574518&s=612x612&w=0&h=3gIw814QVWhm1qxgVt72E_c89XfZ2Gw-h22x74L8RVQ=',
    },
    {
        label: 'Lake Como, Italy',
        imgPath:
            'https://inspirations.blacktomato.com/wp-content/uploads/2019/11/Lake-Como-shoreline.jpg',
    },
];





const safetravel = [{
    url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/safety-measures/h1-crew-new-ppe.jpg',
    title: 'Safe travel',
    width: '25%',
},
]
const travelReq = [{
    url: 'https://i.pinimg.com/originals/db/d7/65/dbd7657550f6c3e8d23b6f869ca3b94a.jpg',
    title: 'Travel requirments ',
    width: '25%',
},]
const whereWeTravel = [{
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/QR_Destinations_2021Jan.png/800px-QR_Destinations_2021Jan.png',
    title: 'Where we travel',
    width: '25%',
},]

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
    left: 'calc(50% - 5px)',
    transition: theme.transitions.create('opacity'),
}));



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function UserProfile(props) {
    const navigate = useNavigate();

    const location = useLocation();
    const id1 = location.state;
    console.log(id1);

    const images = [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyC8qitchp3CTc0tRNk5VHwTmXw7Gt7zzqMA&usqp=CAU', title: 'On Board', width: '50%' }]

    const meet = [{ url: 'https://pearlassist.com/media/catalog/product/cache/16cbb02c6aa0557438510836af2c5f3b/m/a/maas-arrival-bw_9.jpg', title: 'Meet', width: '50%' }]

    const group = [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9fzOl3e33qv7675TVc3MMySxSiIXwzNvUxQ&usqp=CAU', title: 'Group travel', width: '60%' }]

    const corporate = [{ url: 'https://fifocapital.co.nz/wp-content/uploads/2020/10/Corporate-travel-best-practices.jpg', title: 'Corporate travel', width: '70%' }]
    const baggage = [{ url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage.jpg', title: 'Extra baggage', width: '70%' }]
    const baggageimage = [
        {
            url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage-ar.jpg',
            title: 'Add extra baggage',
            width: '50%',
        },];

    const handbaggage = [{ url: 'https://www.iloveqatar.net/public/images/local/hand-baggage-qatar-travel.jpg', title: ' Hand Baggage', width: '70%' }]

    //compliment your journey
    const imagesUpgrade = [
        {
            url: 'https://livingword.co.uk/wp-content/uploads/2019/07/Screenshot-2019-07-04-at-15.18.41-1024x576.png',
            title: 'Widen your journey',
            width: '30%',
        },

        {
            url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/brand/qsuite/h1-qsuite-businessman.jpg',
            title: 'Upgrade seats',
            width: '30%',
        },

        {
            url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage.jpg',
            title: 'Extra Baggage',
            width: '30%',
        },
    ];

    //choose code text field
    const [country, setCountriesChosen] = useState("");

    const handleChangeCountry = (event) => {
        setCountriesChosen(event.target.value);
    };

    //choose title 
    const [title, setTitle] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    //date of birth
    const [dob, setDOB] = React.useState(null);

    //home country
    const [homeCountry, setHomeCountry] = React.useState();
    const handleChangeHomeCountry = (event) => {
        setHomeCountry(event.target.value);
    };
    //privilege button
    const [priClicked, setPriClicked] = React.useState(null);
    const openPri = Boolean(priClicked);
    const handleClickPri = (event) => {
        setPriClicked(event.currentTarget);
    };
    const handleClosePri = () => {
        setPriClicked(null);
    };
    //book button
    const [bookClicked, setBookClicked] = useState(null);
    const openBClicked = Boolean(bookClicked);
    const handleClickBook = (event) => {
        setBookClicked(event.currentTarget);
    };
    const handleCloseBook = () => {
        setBookClicked(null);
    };

    //experience button
    const [experienceClicked, setExperienceClicked] = useState(null);
    const openEClicked = Boolean(experienceClicked);
    const handleClickExperience = (event) => {
        setExperienceClicked(event.currentTarget);
    };
    const handleCloseExperience = () => {
        setExperienceClicked(null);
    };

    const [loginClicked, setLoginClicked] = useState(false);

    const handleLoginClicked = (event) => {
        setLoginClicked(true);
    };

    const [helpButton, setHelpButton] = useState(false);

    const handleHelpClicked = (event) => {
        setHelpButton(true);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    //terms and conditions
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeAcc = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;


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

    //user profile
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    console.log(id1);

    return (
        <div style={{marginTop:900}} >
           
            {flights.searchRes ? <SearchResultsu flights={flights} date={retDate} type="Departure" /> : <div>

                <div style={{ marginTop: 200, marginLeft: 390,width:915}}>
                    
                    <Paper elevation={6} style={{ width: 1200, height: 325, marginLeft: -333, backgroundColor: '#FFFFFF', opacity: 0.95, marginTop: 600 }}>
                        <div>
                            <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342', fontSize: 30, marginLeft: 467, marginTop: 100 }} >FIND A FLIGHT</h3>
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
                            <Button aria-describedby={id1} variant="outlined" onClick={handleClick} sx={{ m: 1, minWidth: 300 }} style={{ width: 200, height: 60, marginLeft: 519, marginTop: -107, fontSize: 12 }}>
                                {Number(adult) + Number(child)}passenger(s),{cabin}<ArrowDropDownIcon />
                            </Button>
                            <Popover
                                id={id1}
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
                            <div style={{ marginLeft: 750, marginRight: 20, width: 200, marginTop: -88,color:"#161342" }}>
                                <Stack style={{color:"#161342"}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}  style={{color:"#161342"}}>
                                    <DatePicker
                                        label="Departure date"
                                        mask="_//_"
                                        value={date}
                                        style={{ width: 50, marginTop: 30,color:"#161342" }}
                                        onChange={(newValue) => {
                                            setDate(moment(new Date(newValue).toUTCString()).format("YYYY-MM-DDT22:00:00.000") + "Z");
                                        }}
                                        renderInput={(params) => <TextField {...params} />}

                                    />
                                </LocalizationProvider>
                                </Stack>
                            </div>
                            <div style={{ width: 200, marginLeft: 980, marginTop: -57 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Return date"
                                        mask="_//_"

                                        id="outlined-start-adornment"
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

                                navigate("/SearchRes", { state: { flights: { from: from, to: to, date: date, arr: arr, dep: dep, tdep: tdep, tarr: tarr, ec: ec, bs: bs, first: first, flightNum: flightNum, retDate: "", searchRes: true }, cabin: cabin, adultPass: adult, childPass: child, id: id1 } });
                            }}>
                                Search
                            </Button>


                        </form>
                    </Paper>
                    {/* <h1 style={{marginLeft:90,color:"black"}}>  Search your flight:  <CompareArrowsIcon/><br/>Departure Flight</h1> */}

                </div>
                            

                <h1 style={{color:"#161342",marginLeft:470,marginTop:50}}>Your Upcoming Flights</h1>
                <div style={{marginTop:-900, marginLeft:57}}>
                <ReservedFlights></ReservedFlights>
                            </div>

            </div >
            
                            
            }  )

           
        </div >
    )
}

export default UserProfile