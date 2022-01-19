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
import Searchu from './Searchu'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Help from './Help';
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
import LoginPage from './LoginPage'


const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));



function User() {
    //departure date
    const [value, setValue] = useState(null);
    //arrival date
    const [arrValue, setArrValue] = useState(null);
    //departure terminal
    const [depTerminal, setdepTerminal] = useState('');
    const handleChange = (event) => {
        setdepTerminal(event.target.value);
    };
    const [open, setOpenDep] = useState(false);
    const handleClose = () => {
        setOpenDep(false);
    };

    const handleOpen = () => {
        setOpenDep(true);
    };


    //arrival terminal
    const [arrTerminal, setarrTerminal] = useState('');
    const handleChangeArr = (event) => {
        setarrTerminal(event.target.value);
    };
    const [openArr, setOpenArr] = useState(false);
    const handleCloseArr = () => {
        setOpenArr(false);
    };

    const handleOpenArr = () => {
        setOpenArr(true);
    };

    //cabin types
    const [cabinTypes, setCabinTypes] = useState('');
    const handleChangeCabin = (event) => {
        setCabinTypes(event.target.value);
    };
    const [openCabin, setOpenCabin] = useState(false);
    const handleCloseCabin = () => {
        setOpenCabin(false);
    };

    const handleOpenCabin = () => {
        setOpenCabin(true);
    };

    //number of adults
    const [noOfAdults, setNoOfAdults] = useState('');
    const handleChangeAd = (event) => {
        setNoOfAdults(event.target.value);
    };
    const [openAd, setOpenAd] = useState(false);
    const handleCloseAd = () => {
        setOpenAd(false);
    };

    const handleOpenAd = () => {
        setOpenAd(true);
    };

    //number of children
    const [noOfChildren, setNoOfChildren] = useState('');
    const handleChangeCh = (event) => {
        setNoOfChildren(event.target.value);
    };
    const [openCh, setOpenCh] = useState(false);
    const handleCloseCh = () => {
        setOpenCh(false);
    };

    const handleOpenCh = () => {
        setOpenCh(true);
    };

    //search button

    //styles
    const useStyles = makeStyles({
        root: { maxWidth: 345, }
        ,
        media: { height: 150, }

    })
    const classes = useStyles();

    //border
    const styles = theme => ({
        notchedOutline: {
            borderWidth: "2px",
            borderColor: "grey"
        }
    });
    const borders = styles();
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });


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


    //alert message
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });





    const [alertOpen, setOpenAlert] = useState(false);

    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
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
    const images = [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyC8qitchp3CTc0tRNk5VHwTmXw7Gt7zzqMA&usqp=CAU', title: 'On Board', width: '50%' }]

    const meet = [{ url: 'https://pearlassist.com/media/catalog/product/cache/16cbb02c6aa0557438510836af2c5f3b/m/a/maas-arrival-bw_9.jpg', title: 'Meet', width: '50%' }]

    const group = [{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9fzOl3e33qv7675TVc3MMySxSiIXwzNvUxQ&usqp=CAU', title: 'Group travel', width: '60%' }]

    const corporate = [{ url: 'https://fifocapital.co.nz/wp-content/uploads/2020/10/Corporate-travel-best-practices.jpg', title: 'Corporate travel', width: '70%' }]
    //https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage.jpg

    //'https://smallbizclub.com/wp-content/uploads/2015/11/Get-Rid-of-Excess-Baggage.jpg'
    const baggage = [{ url: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/miscellaneous/baggages/h1-extra-baggage.jpg', title: 'Extra baggage', width: '70%' }]

    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [dateDep, setDepDate] = useState("");
    const [dateRet, setRetDate] = useState("");
    const [arr, setArr] = useState("");
    const [dep, setDep] = useState("");
    const [tdep, setTdep] = useState("");
    const [tarr, setTarr] = useState("");
    const [children, setChildren] = useState("");
    const [adults, setAdults] = useState("");

    const [cabin, setCabin] = useState("");
    const [price, setPrice] = useState("")
    const [searchClicked, setSearchClicked] = useState(false);


    const [clicked, setClicked] = useState(false);
    const [show, setShow] = useState(false);
    const [flights, setFlights] = useState({ from: "", to: "", dateDep: "", dateRet: "", tdep: "", tarr: "", children: "", adults: "", cabin: "", price: "" })

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
    const [viewResFlights, setResFlights] = useState(false);
    const handleResFlights = () => {
        setResFlights(true);
        handleCloseNavMenu();
    };
    const [homeClicked, setHomeClicked] = useState(false);
    const [exploreClicked, setExploreClicked] = useState(false);
    const [help, setHelpClicked] = useState(false);

    //experience button
    const [experienceClicked, setExperienceClicked] = useState(null);
    const openEClicked = Boolean(experienceClicked);
    const handleClickExperience = (event) => {
        setExperienceClicked(event.currentTarget);
    };
    const handleCloseExperience = () => {
        setExperienceClicked(null);
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

    //privilege button
    const [priClicked, setPriClicked] = React.useState(null);
    const openPri = Boolean(priClicked);
    const handleClickPri = (event) => {
        setPriClicked(event.currentTarget);
    };
    const handleClosePri = () => {
        setPriClicked(null);
    };
    //back button
    const [backButton, setBackButton] = useState(false);
    //booknow button
    const [bClicked, setBClicked] = useState(false);
    //
    const [searchBClicked, setSearchBClicked] = useState(false);



    //buttom navigation
    const [bottomvalue, setBottomValue] = useState('recents');

    const handleChangeBNav = (event, newValue) => {
        setBottomValue(newValue);
    };


    //help button
    const [helpButton, setHelpButton] = useState(false);

    const handleHelpClicked = (event) => {
        setHelpButton(true);
    };

    useEffect(() => {
        if (!searchClicked) {
            return false;
        }
        if (searchClicked) {
            setFlights({ from: from, to: to, dateDep: dateDep, dateRet: dateRet, tdep: tdep, tarr: tarr, children: children, adults: adults, cabin: cabin, price: price })
            if (flights.from === "") {
                delete flights.from;

            }
            if (flights.to === "") {
                delete flights.to;

            }
            if (flights.dateDep === "") {
                delete flights.dateDep;

            }
            if (flights.dateDep === "") {
                delete flights.dateRet;

            }

            if (flights.tarr === "") {
                delete flights.tarr;

            }
            if (flights.tdep === "") {
                delete flights.tdep;

            }


            axios.post('http://localhost:8080/searchDepartureFlights', {


                From: flights.from,
                To: flights.to,
                DepartureDate: flights.dateDep,
                cabin: flights.cabin,
                adults: flights.adults,
                child: flights.children,

                TerminalDeparture: flights.tdep,
                TerminalArrival: flights.tarr,




            })
                .then(function (response) {
                    console.log("xxx");
                    setFlights(response.data);
                    setSearchClicked(false);

                }

                )

        }


    }



    );



    //login/signup button

    const [loginClicked, setLoginClicked] = useState(false);

    const handleLoginClicked = (event) => {
        setLoginClicked(true);
    };


    return (
        <div>

            <AppBar position="fixed" style={{ width: window.screen.width }} color='#161342'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <img src={BSBlogo}  alt="BSB logo"/> */}
                        <Stack direction="row" spacing={6} style={{ marginLeft: 400 }}>
                            <Button
                                variant="outlined"
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={openEClicked ? 'true' : undefined}
                                onClick={handleClickExperience}
                            // style={{ marginLeft: 500, marginRight: 70 }}
                            >

                                Experience
                            </Button>
                            <Menu
                                id="basic-menu"
                                size='medium'
                                anchorEl={experienceClicked}
                                open={openEClicked}
                                onClose={handleCloseExperience}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <Stack direction="row" spacing={5} style={{ width: window.screen.width, marginLeft: 70 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            '& > :not(style)': {
                                                m: 1,
                                                width: 500,
                                                height: 300,
                                            },
                                        }}
                                    // style={{marginLeft: 20}}
                                    >

                                        <Box style={{ width: 300, height: 300 }}>
                                            <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Before you fly</h6>
                                            <br />




                                            <Button style={{ color: '#808294' }} variant="outlined">
                                                <LuggageIcon />
                                                    Baggage Allowance
                                            </Button>
                                            <br />
                                            <br />


                                            <Button variant="outlined" style={{ color: '#808294' }}>
                                                <UpgradeIcon />
                                                Upgrade your journey
                                            </Button>
                                            <br />
                                            <br />

                                            <Button variant="outlined" style={{ color: '#808294' }}>
                                                <RoomServiceIcon />
                                                Special Services
                                            </Button>

                                        </Box>
                                        <br />
                                        <br />
                                        {/* <MenuItem onClick={handleClose}>
                                        <UpgradeIcon />Upgrade your journey</MenuItem> */}
                                        {/* <MenuItem onClick={handleClose}>
                                        <RoomServiceIcon />
                                        Special services</MenuItem> */}

                                    </Box>
                                    <Box style={{ width: 300, height: 300 }}>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>At the airport</h6>
                                        <br />



                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            <HotelIcon />
                                            About airport hotel


                                        </Button>
                                        <br />
                                        <br />


                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            <TransferWithinAStationIcon />
                                            Transit Accomodation


                                        </Button>
                                        <br />
                                        <br />


                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            <NightShelterIcon />
                                            Lounges


                                        </Button>



                                    </Box>
                                    <Box>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>On board services</h6>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} style={{ width: 300, height: 300, marginTop: 40 }}>

                                            {images.map((image) => (
                                                <ImageButton
                                                    focusRipple
                                                    key={image.title}
                                                    style={{
                                                        width: image.width,
                                                    }}
                                                >
                                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                                    <Image>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            style={{ color: '#808294' }}
                                                            sx={{
                                                                position: 'relative',
                                                                p: 4,
                                                                pt: 2,
                                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                            }}
                                                        >
                                                            {image.title}
                                                            <ImageMarked className="MuiImageMarked-root" />
                                                        </Typography>
                                                    </Image>
                                                </ImageButton>
                                            ))}

                                            <tr >
                                                <LocalDiningIcon style={{ marginLeft: 20 }} />
                                                <Button variant="outlined" style={{ height: 30, marginTop: -5 }} style={{ color: '#808294' }}>
                                                    Dining
                                                </Button>
                                                <br />
                                                <br />
                                                <WifiIcon style={{ marginLeft: 20 }} />
                                                <Button variant="outlined" style={{ height: 30, marginTop: -5 }} style={{ color: '#808294' }}>
                                                    Super Wifi
                                                </Button>
                                                <br />

                                            </tr>


                                        </Box>


                                    </Box>
                                    <Box>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Our Services</h6>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} style={{ width: 300, height: 300, marginTop: 40 }}>

                                            {meet.map((image) => (
                                                <ImageButton
                                                    focusRipple
                                                    key={image.title}
                                                    style={{
                                                        width: image.width,
                                                    }}
                                                >
                                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                                    <Image>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            color="inherit"
                                                            sx={{
                                                                position: 'relative',
                                                                p: 4,
                                                                pt: 2,
                                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                            }}
                                                        >
                                                            Meet and Assist
                                                            <ImageMarked className="MuiImageMarked-root" />
                                                        </Typography>
                                                    </Image>
                                                </ImageButton>
                                            ))}



                                        </Box>


                                    </Box>



                                </Stack>
                            </Menu>

                            <Button
                                variant="outlined"
                                id="secondary"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={openBClicked ? 'true' : undefined}
                                onClick={handleClickBook}
                            // style={{ marginRight: 70 }}
                            >
                                Book
                            </Button>
                            <Menu
                                id="basic-menu"
                                size='medium'
                                anchorEl={bookClicked}
                                open={openBClicked}
                                onClose={handleCloseBook}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <Stack direction="row" spacing={5} style={{ width: window.screen.width, marginLeft: 100 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            '& > :not(style)': {
                                                m: 1,
                                                width: 500,
                                                height: 300,
                                            },
                                        }}
                                    // style={{marginLeft: 20}}
                                    >

                                        <Box style={{ width: 300, height: 300 }}>
                                            <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Plan your trip</h6>
                                            <br />




                                            <Button style={{ color: '#808294' }} variant="outlined">
                                                <FlightIcon />
                                                Flight Schedule
                                            </Button>
                                            <br />
                                            <br />


                                            <Button variant="outlined" style={{ color: '#808294' }}>
                                                <CarRentalIcon />
                                                Car Rental
                                            </Button>
                                            <br />
                                            <br />

                                            <Button variant="outlined" style={{ color: '#808294' }}>
                                                <LoyaltyIcon />
                                                Travel Insurance
                                            </Button>

                                        </Box>
                                        <br />
                                        <br />
                                        {/* <MenuItem onClick={handleClose}>
                                        <UpgradeIcon />Upgrade your journey</MenuItem> */}
                                        {/* <MenuItem onClick={handleClose}>
                                        <RoomServiceIcon />
                                        Special services</MenuItem> */}

                                    </Box>
                                    <Box style={{ width: 300, height: 300 }}>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Travel Information</h6>
                                        <br />



                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            Travel requirements


                                        </Button>
                                        <br />
                                        <br />


                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            Flexible travel options


                                        </Button>
                                        <br />
                                        <br />


                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            Safe travel


                                        </Button>



                                    </Box>
                                    <Box>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Group travel</h6>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} style={{ width: 300, height: 300, marginTop: 40 }}>

                                            {group.map((image) => (
                                                <ImageButton
                                                    focusRipple
                                                    key={image.title}
                                                    style={{
                                                        width: image.width,
                                                    }}
                                                >
                                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                                    <Image>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            color="inherit"
                                                            sx={{
                                                                position: 'relative',
                                                                p: 4,
                                                                pt: 2,
                                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                            }}
                                                        >
                                                            Book your group trip
                                                            <ImageMarked className="MuiImageMarked-root" />
                                                        </Typography>
                                                    </Image>
                                                </ImageButton>
                                            ))}



                                        </Box>
                                    </Box>
                                    <Box>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Corporate travel</h6>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} style={{ width: 300, height: 300, marginTop: 40 }}>

                                            {corporate.map((image) => (
                                                <ImageButton
                                                    focusRipple
                                                    key={image.title}
                                                    style={{
                                                        width: image.width,
                                                    }}
                                                >
                                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                                    <Image>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            color="inherit"
                                                            sx={{
                                                                position: 'relative',
                                                                p: 4,
                                                                pt: 2,
                                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                            }}
                                                        >
                                                            Book your corporate trip
                                                            <ImageMarked className="MuiImageMarked-root" />
                                                        </Typography>
                                                    </Image>
                                                </ImageButton>
                                            ))}



                                        </Box>
                                    </Box>

                                </Stack>
                            </Menu>

                            <Button
                                variant="outlined"
                                id="secondary"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={openPri ? 'true' : undefined}
                                onClick={handleClickPri}
                            >
                                Privilege Club
                            </Button>
                            <Menu
                                id="basic-menu"
                                size='medium'
                                anchorEl={priClicked}
                                open={openPri}
                                onClose={handleClosePri}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <Stack direction="row" spacing={5} style={{ width: window.screen.width, marginLeft: 100 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            '& > :not(style)': {
                                                m: 1,
                                                width: 500,
                                                height: 300,
                                            },
                                        }}
                                    // style={{marginLeft: 20}}
                                    >

                                        <Box style={{ width: 300, height: 300 }}>
                                            <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Plan your trip</h6>
                                            <br />




                                            <Button style={{ color: '#808294' }} variant="outlined">
                                                <HubIcon />
                                                About privlege club
                                            </Button>
                                            <br />
                                            <br />


                                            <Button variant="outlined" style={{ color: '#808294' }}>
                                                <PeopleIcon />
                                                Family programs
                                            </Button>
                                            <br />
                                            <br />

                                            <Button variant="outlined" style={{ color: '#808294' }}>
                                                <SchoolIcon />
                                                Student programs
                                            </Button>


                                        </Box>
                                        <br />
                                        <br />
                                        {/* <MenuItem onClick={handleClose}>
                                        <UpgradeIcon />Upgrade your journey</MenuItem> */}
                                        {/* <MenuItem onClick={handleClose}>
                                        <RoomServiceIcon />
                                        Special services</MenuItem> */}

                                    </Box>
                                    <Box style={{ width: 300, height: 300 }}>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Earn</h6>
                                        <br />



                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            Earn miles and points


                                        </Button>
                                        <br />
                                        <br />


                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            Buy, gift & transfer


                                        </Button>
                                        <br />
                                        <br />


                                        <Button variant="outlined" style={{ color: '#808294' }}>
                                            Buy points


                                        </Button>



                                    </Box>
                                    <Box>
                                        <h6 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342' }}>Extra Baggage</h6>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} style={{ width: 400, height: 300, marginTop: 40 }}>

                                            {baggage.map((image) => (
                                                <ImageButton
                                                    focusRipple
                                                    key={image.title}
                                                    style={{
                                                        width: image.width,
                                                    }}
                                                >
                                                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                                    <Image>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                            color="inherit"
                                                            sx={{
                                                                position: 'relative',
                                                                p: 4,
                                                                pt: 2,
                                                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                                            }}
                                                        >
                                                            Add extra luggage
                                                            <ImageMarked className="MuiImageMarked-root" />
                                                        </Typography>
                                                    </Image>
                                                </ImageButton>
                                            ))}



                                        </Box>
                                    </Box>


                                </Stack>
                            </Menu>

                            <Button
                                variant="outlined"
                                id="secondary"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={openPri ? 'true' : undefined}
                                onClick={handleHelpClicked}
                            >
                                Help
                            </Button>

                            <Box style={{ marginLeft: 420 }} onClick={handleLoginClicked}>
                                <Button variant="outlined">
                                    <AccountCircleIcon />
                                    Login  | Sign up
                                </Button>
                            </Box>
                        </Stack>











                        {/* <Box sx={{ flexGrow: 0 }} style={{ marginLeft: 800 }}>
                            <Tooltip title="Open settings">

                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleEditProfile}>
                                    Edit Profile
                                </MenuItem>

                                <MenuItem onClick={handleLogout}>
                                    Logout</MenuItem>
                                <MenuItem onClick={handleResFlights}>
                                    View reserved flights</MenuItem>



                            </Menu>
                        </Box>

                        <Button onClick={(event) => setBackButton(true)} >
                            Back
                        </Button> */}

                    </Toolbar>
                </Container>
            </AppBar>


            <div>

                {/* <ChooseSeat logout={logoutClicked} edit={editProfile} />  */}

                {loginClicked? <LoginPage/> : (searchBClicked ? <Searchu style={{ marginLeft: 100 }} /> : (editProfile ? <EditProfile logout={logoutClicked} back={backButton} component={<User />} /> : (logoutClicked || backButton ? <App /> : (viewResFlights ? <ViewResFlights edit={editProfile} logout={logoutClicked} back={backButton} component={<User />} /> :
                    <div style={{ marginTop: 500, marginLeft: 30 }}>


                        <h1 style={{ position: 'relative', marginTop: -800, marginLeft: 110 }}>Book your flight now</h1>
                        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1, marginLeft: 110 }}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{ width: 128, height: 128 }}>
                                        <Img alt="trip" src="https://static.dezeen.com/uploads/2020/11/eixample-barcelona-aerial-view_dezeen_2364_sq.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div" color="#112D4E" fontWeight="bold">
                                                Barcelona
                                            </Typography>
                                            <Typography variant="body2" gutterBottom color="#3F72AF">
                                                A trip you do not want to miss!
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Check all the details now
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="secondary" style={{ position: 'center', marginLeft: 100, marginTop: -15 }} onClick={(event) => setSearchClicked(true)}>
                                                Explore
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 300, flexGrow: 1, marginLeft: 120, marginTop: 10 }}>
                            <Grid container spacing={2} sx={{ height: 200 }}>

                                <Grid item xs={12} sm container >
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div" color="#112D4E" fontWeight="bold" style={{ marginLeft: 15 }}>
                                                Enter your email to get the latest updates
                                            </Typography>
                                            <TextField

                                                required
                                                id="outlined-error"
                                                label="Email"
                                                style={{ marginLeft: 15 }}
                                                defaultValue=""

                                            />

                                        </Grid>
                                        <Grid item>
                                            <Stack spacing={2} sx={{ width: '100%' }}>
                                                <Button variant="secondary" style={{ position: 'center', marginLeft: 100, marginTop: -15, width: 80 }} onClick={handleClickAlert}>
                                                    Submit
                                                </Button>
                                                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                                                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                                                        Email submitted successfully
                                                    </Alert>
                                                </Snackbar>


                                            </Stack>



                                        </Grid>
                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper style={{ marginLeft: 200, marginTop: -300 }} sx={{ p: 2, margin: 'auto', maxWidth: 300, flexGrow: 1, marginLeft: 110 }}>
                            <Grid container spacing={2}>
                                <Grid item>

                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography style={{ position: 'center', marginLeft: 40 }} gutterBottom variant="subtitle1" component="div" color="#112D4E" fontWeight="bold">
                                                Book your trip now!
                                            </Typography>

                                        </Grid>
                                        <Grid item>
                                            <Button variant="secondary" style={{ position: 'center', marginLeft: 50, marginTop: -15 }} onClick={(event) => setSearchBClicked(true)}>
                                                Search flights
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>


                    </div>
                ))))}
            </div>
        </div>


    )
}

export default User
