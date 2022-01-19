//imports

import React from 'react'
import Admin from './Admin';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBNavbarLink,
    MDBContainer,
    MDBIcon,
    MDBCol, MDBNavbarBrand
} from 'mdb-react-ui-kit';

import User from './User';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import Mail from '@mui/icons-material/Mail';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Dropdown from '@restart/ui/esm/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import DropdownToggle from '@restart/ui/esm/DropdownToggle';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import { Backdrop } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';


import Layout from './Layout'



export default function App() {
    const [userClicked, setUserClicked] = useState(false);
    const [adminClicked, setAdminClicked] = useState(false);
    const [logoutClicked, setLogoutClicked] = useState(false);
    const settings = ['Logout'];
    //buttom nav bar
    const [bNavBar, setBNavBar] = useState('recents');

    const handleChangeBNavBar = (event, newValue) => {
        setBNavBar(newValue);
    };

    //menu slider
    const [alignment, setAlignment] = useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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


    //profile 

    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    }));

    const accountActions = [
        { icon: <AccountCircleIcon />, name: 'Profile' },
        { icon: <SettingsIcon />, name: 'Settings' },
        { icon: <LogoutIcon />, name: 'Logout' },
        { icon: <EditIcon />, name: 'Edit Profile' },
    ];
    const [accountOpen, setAccountOpen] = useState(false);
    const handleOpenAccount = () => setAccountOpen(true);
    const handleCloseAccount = () => setAccountOpen(false);
    const [direction, setDirection] = React.useState('down');

    const handleDirectionChange = (event) => {
        setDirection(direction);
    };

    //navigation bar
    function handleLogout() {

        setAdminClicked(false);
        setUserClicked(false);


    }




    return (
        <div>
            <header>




                <div>




                    <div className='d-flex justify-content-center align-items-center h-100'>

                        <div className='text-white'>
                            <h5 className='mb-4'></h5>
                            {adminClicked ? <Admin></Admin> : (userClicked ? <User></User> : <div>

                              
                           
                                <Button variant="secondary" data-target="#myModal" data-toggle="modal" data-backdrop="static" onClick={(event) => setUserClicked(true)} data-keyboard="false" style={{
                                    position: 'absolute',
                                    right: 790,
                                    top: 350,
                                }}>User</Button>
                                <Button variant="outline-primary" style={{
                                    position: 'absolute',
                                    right: 650,
                                    top: 350,
                                }} data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false" onClick={(event) => setAdminClicked(true)} >Admin</Button>





                            </div>
                            )}
                        </div>



                    </div>
                </div>



            </header>


        </div>
    )
}
