import React from 'react'
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';

import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DepartureList from './DepartureList';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import App from './App';
import EditProfile from './EditProfile';
import ViewResFlights from './ViewResFlights';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Language from '@mui/icons-material/Language';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Anchor from '@restart/ui/esm/Anchor';
import LuggageIcon from '@mui/icons-material/Luggage';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HotelIcon from '@mui/icons-material/Hotel';
import CarRentalIcon from '@mui/icons-material/CarRental';
import GroupsIcon from '@mui/icons-material/Groups';
import Groups from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import ChooseSeat from './ChooseSeat';
import Layout from './Layout'
import Search from './Search'
import SearchBody from './SearchBody';
import SearchMain from './SearchMain'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fontWeight } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import FlightIcon from '@mui/icons-material/Flight';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import WifiIcon from '@mui/icons-material/Wifi';
import Wifi from '@mui/icons-material/Wifi';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel } from '@material-ui/core';
import { Checkbox } from '@mui/material';
import { FormGroup } from 'react-bootstrap';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

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
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#5c0931',
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
function createData(x, y, z, w) {
    return { x, y, z, w };
}

function createFirst(x, y) {
    return { x, y };
}

const economyrows = [

    createData('Flights to/from all destinations', '25kg (55lb)', '30kg (66lb)', '35kg (77lb)'),
    createData('Flights to/from Africa or Americas', '2 pieces (23kg/50lb each)', '2 pieces (23kg/50lb each)', '2 pieces (23kg/50lb each)'),
    createData('Hand baggage', '1 piece (7kg/15lb)', '	1 piece (7kg/15lb)', '	1 piece (7kg/15lb)'),


];
const businessrows = [

    createData('Flights to/from all destinations', '40kg (110lb)', '	40kg (88lb)', '	40kg (88lb)'),
    createData('Flights to/from Africa or Americas', '2 pieces (32kg/70lb each)', '2 pieces (32kg/70lb each)', '2 pieces (32kg/70lb each)'),
    createData('Hand baggage', '2 pieces (15kg/33lb total)', '	2 pieces (15kg/33lb total)', '2 pieces (15kg/33lb total)'),


];
const firstrows = [

    createFirst('Flights to/from all destinations', '50kg (88lb)'),
    createFirst('Flights to/from Africa or Americas', '2 pieces (32kg/70lb each)'),
    createFirst('Hand baggage', '2 pieces (15kg/33lb total)'),


];


function BaggageAllowance() {

    const navigate = useNavigate();

    const images = [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyC8qitchp3CTc0tRNk5VHwTmXw7Gt7zzqMA&usqp=CAU', title: 'On Board', width: '50%' }]

    const meet = [{ url: 'https://pearlassist.com/media/catalog/product/cache/16cbb02c6aa0557438510836af2c5f3b/m/a/maas-arrival-bw_9.jpg', title: 'Meet', width: '50%' }]

    const group = [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9fzOl3e33qv7675TVc3MMySxSiIXwzNvUxQ&usqp=CAU', title: 'Group travel', width: '60%' }]

    const corporate = [{ url: 'https://fifocapital.co.nz/wp-content/uploads/2020/10/Corporate-travel-best-practices.jpg', title: 'Corporate travel', width: '70%' }]
    const baggage = [{ url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage.jpg', title: 'Extra baggage', width: '70%' }]
    const baggageimage = [
        {
            url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage-ar.jpg',
            title: 'Add extra baggage',
            width: '0%',
        },];

    const handbaggage = [{ url: 'https://www.iloveqatar.net/public/images/local/hand-baggage-qatar-travel.jpg', title: ' Hand Baggage', width: '70%' }]
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

    //tab panel
    const [tabPanel, setTabPanel] = React.useState(0);

    const handleChangePanel = (event, newValue) => {
        setTabPanel(newValue);
    };
    // const { children, value, index, ...other } = props;


    //accordion
    const [expanded, setExpandedAcc] = React.useState(false);

    const handleChangeAcc = (panel) => (event, isExpanded) => {
        setExpandedAcc(isExpanded ? panel : false);
    };
    return (
        <div>
            <Navigation />
            <div

                id='intro-example'
                className='p-5 text-center bg-image'
                style={{
                    background: `url(https://dej5dgk6v2ulk.cloudfront.net/Web/resource/images/baggage-allowance-banner1.jpg)`, backgroundSize: "contain", backgroundRepeat: "repeat", height: 400, width: window.screen.width,
                    marginTop: -290,

                }}


            >
                <h3 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#5c0931', marginTop: 70, marginLeft: -1000 }} >Baggage Allowance</h3>
                <Typography style={{ fontSize: 20, fontFamily: 'Verdana', fontWeight: "bold", marginTop: 280, marginLeft: 100, color: ' #5c0931' }}

                    align="left"
                    gutterBottom
                >
                    <Link style={{ color: '#5c0931' }} href="#" onClick={() => navigate("/Search")}>Home</Link>  Buy gifts or transfer miles
                    <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 50, color: ' #5c0931', marginLeft: 0 }} />
                </Typography>


                <Box sx={{ width: '100%', typography: 'body1', marginTop: 0, marginLeft: 5 }}>
                    <TabContext value={tabPanel}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangePanel} aria-label="lab API tabs example">
                                <Tab label="Economy" style={{ fontFamily: 'Verdana', color: "#5c0931" }} color="#5c0931" value="1" />
                                <Tab label="Business Class" style={{ fontFamily: 'Verdana', color: "#5c0931" }} value="2" />
                                <Tab label="First Class" style={{ fontFamily: 'Verdana', color: "#5c0931", borderColor: '#5c0931' }} value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell> </StyledTableCell>
                                            <StyledTableCell align="center">Economy Classic</StyledTableCell>
                                            <StyledTableCell align="center">Economy Convenience</StyledTableCell>
                                            <StyledTableCell align="center">Economy Comfort</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {economyrows.map((row) => (
                                            <StyledTableRow key={row.x}>
                                                <StyledTableCell component="th" scope="row" style={{ color: '#FFFFFF', backgroundColor: '#5c0931' }}>
                                                    {row.x}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.y}</StyledTableCell>
                                                <StyledTableCell align="center">{row.z}</StyledTableCell>
                                                <StyledTableCell align="center">{row.w}</StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value="2">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell> </StyledTableCell>
                                            <StyledTableCell align="center">Business Classic</StyledTableCell>
                                            <StyledTableCell align="center">Business Comfort</StyledTableCell>
                                            <StyledTableCell align="center">Business Elite</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {businessrows.map((row) => (
                                            <StyledTableRow key={row.x}>
                                                <StyledTableCell component="th" scope="row" style={{ color: '#FFFFFF', backgroundColor: '#5c0931' }}>
                                                    {row.x}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.y}</StyledTableCell>
                                                <StyledTableCell align="center">{row.z}</StyledTableCell>
                                                <StyledTableCell align="center">{row.w}</StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value="3">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell> </StyledTableCell>
                                            <StyledTableCell align="center" style={{ backgroundColor: "#5c0931" }}></StyledTableCell>
                                            <StyledTableCell align="center" style={{ backgroundColor: "#5c0931" }}></StyledTableCell>
                                            <StyledTableCell align="center">First Elite</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {firstrows.map((row) => (
                                            <StyledTableRow key={row.x}>
                                                <StyledTableCell component="th" scope="row" style={{ color: '#FFFFFF', backgroundColor: '#5c0931' }}>
                                                    {row.x}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ backgroundColor: '#5c0931' }}> </StyledTableCell>
                                                <StyledTableCell style={{ backgroundColor: '#5c0931' }}> </StyledTableCell>
                                                <StyledTableCell align="center">{row.y}</StyledTableCell>


                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer></TabPanel>
                    </TabContext>

                    <br />
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAcc('panel1')} style={{ width: 1400, marginLeft: 20 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ fontFamily: 'Verdana', width: '20%', flexShrink: 0, color: '#5c0931', fontWeight: 'bold' }}>
                                    Checked baggage guidelines
                                </Typography>

                            </AccordionSummary>
                            <hr />
                            <AccordionDetails>
                                <Typography style={{ fontFamily: 'Verdana', color: '#5c0931' }}>
                                    For routes where the weight concept apply, there is no limit on the number of pieces that can be checked in as long as the weight allowance for the total number of pieces is not exceeded. However, limitations may apply based on aircraft carrying capacity.

                                    Baggage allowance may vary depending on flight and booking class.  You can find the number of pieces and weight allowed for your journey when you select your flights on qatarairways.com, as well as on your ticket prior to travel.
                                    <br />
                                    <br />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item style={{ marginLeft: 100 }} xs={6}>
                                                <Item style={{ backgroundColor: '#e0dfdf' }}>
                                                    <Box style={{ backgroundColor: '#e0dfdf', height: 200 }}>
                                                        <h4 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#5c0931', fontWeight: 'bold', marginLeft: -380, marginTop: 10 }}>
                                                            Baggage guidelines

                                                        </h4>
                                                        <h6 style={{ color: '#5c0931', fontFamily: 'Verdana' }}>
                                                            1-The length + width + height should not exceed 158cm (by piece), 300cm
                                                            (by weight).
                                                        </h6>
                                                        <br />
                                                        <h6 style={{ color: '#5c0931', fontFamily: 'Verdana' }}>
                                                            2-A single piece of checked-in baggage should weigh no more than 32kg (70lb).
                                                        </h6>
                                                        <br />
                                                        <h6 style={{ color: '#5c0931', fontFamily: 'Verdana', marginLeft: -20 }}>
                                                            3-Charges will apply if you exceed the weight and/or piece allowance on your ticket.
                                                        </h6>

                                                    </Box>
                                                </Item>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Grid>
                                                    <Item style={{ backgroundColor: '#e0dfdf',height:225}}>
                                                        <div

                                                            id='intro-example'
                                                            className='p-5 text-center bg-image'
                                                            style={{
                                                                background: `url(https://www.247customerservicenumber.com/wp-content/uploads/2020/10/Qatar-Airways-Baggage-Policy.jpg)`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: 250, width: 400,


                                                            }}


                                                        >
                                                        </div>

                                                    </Item>

                                                </Grid>





                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Typography>
                            </AccordionDetails>

                        </Accordion>
                        <br />

                        <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAcc('panel2')} style={{ width: 1400, marginLeft: 20 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }} sx={{ fontFamily: 'Verdana', width: '20%', flexShrink: 0, color: '#5c0931', fontWeight: 'bold', marginLeft: -4 }}>Hand baggage details</Typography>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{ fontFamily: 'Verdana', color: '#5c0931' }}>
                                    1-First Class and Business Class customers are allowed to carry two pieces of baggage on board, not to exceed a total weight of 15kg (33lb)
                                    <br />
                                    2-Economy Class customers are allowed to carry one piece of baggage, not to exceed 7kg (15lb)
                                    <br />
                                    <br />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} style={{ marginLeft: 100 }}>
                                                <Item style={{ backgroundColor: '#e0dfdf' }}>
                                                    <Box style={{ backgroundColor: '#e0dfdf', height: 235 }}>
                                                        <h4 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#5c0931', fontWeight: 'bold', marginLeft: -300, marginTop: 10 }}>
                                                            Hand baggage guidelines

                                                        </h4>
                                                        <h6 style={{ color: '#5c0931', fontFamily: 'Verdana' }}>
                                                            1-Maximum dimensions for each piece of hand baggage are 50x37x25cm (20x15x10in);
                                                        </h6>
                                                        <br />
                                                        <h6 style={{ color: '#5c0931', fontFamily: 'Verdana' }}>
                                                            2-Laptops and laptop bags should fit within your hand baggage allowance.
                                                        </h6>
                                                        <br />


                                                    </Box>
                                                </Item>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Grid>
                                                    <Item style={{ backgroundColor: '#e0dfdf', height: 260, width: 400 }}>

                                                        <div

                                                            id='intro-example'
                                                            className='p-5 text-center bg-image'
                                                            style={{
                                                                background: `url(https://www.iloveqatar.net/public/images/local/hand-baggage-qatar-travel.jpg)`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: 250, width: 400,


                                                            }}


                                                        >
                                                        </div>



                                                    </Item>

                                                </Grid>





                                            </Grid>

                                        </Grid>
                                    </Box>


                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <br />
                        <br />
                        <br />
                    </div>

                </Box>
            </div>

        </div>
    )
}

export default BaggageAllowance
