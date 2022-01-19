
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function CreateAccount() {


    const navigate = useNavigate();
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

    //snackbar

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // details

    const [createAccountClicked, setCreatAccountClicked] = useState("");



    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passport, setPassport] = useState("");
    const [error, setError] = useState("");





    //.catch(err => {console.log(err)});


    return (
        <div style={{ width: window.screen.size }}>
            <div style={{marginTop:350}}>
                
                <h4 style={{ fontFamily: 'Verdana', fontWeight: 'bold', color: '#161342', marginLeft: 200, marginTop: -20 }} >CREATE A NEW ACCOUNT </h4>
                <Paper style={{
                    width: 750, height: 700, color: '#e6e5e5'
                    , marginTop: 0, marginLeft: 0, opacity: 0.8
                }}>

                    <Stack spacing={3} style={{ marginLeft: 100 }}>


                        <TextField
                            required
                            id="outlined-required"
                            onChange={event => setEmail(event.target.value)}
                            style={{ width: 550, marginLeft: 0, marginTop: 40 }}
                            label="Enter your email "
                            defaultValue=""
                        />
                        <Stack direction="row" spacing={4}>
                            <TextField
                                required
                                type='password'
                                id="outlined-required"
                                onChange={event => setPassword(event.target.value)}
                                style={{ width: 550, marginLeft: 0, marginTop: 0 }}
                                label="Enter your password "
                                defaultValue=""
                            />
                        </Stack>


                        <Stack direction="row" spacing={4}>
                        <TextField
                                id="outlined-required"
                                label="Country code"
                                value={country}
                                onChange={handleChangeCountry}
                                style={{ width: 130, marginLeft: 0 }}
                            >
                            </TextField>
                        <TextField
                                required
                                id="outlined-required"
                                style={{ width: 400, marginLeft: 20, marginTop: 0 }}
                                label="Enter your mobile number"
                                defaultValue=""
                            />
                        </Stack>



                    </Stack>
                    <Stack>
                        
                            <Stack direction="row" spacing={4} style={{marginLeft:100}}>
                                <TextField
                                    id="outlined-required"
                                    label="Title  (i.e: Mr.,Ms.)"
                                    value={title}
                                    onChange={handleChangeTitle}
                                    style={{ width: 150, marginTop: 20}}
                                >
                                    
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
                                    onChange={event => setFirstName(event.target.value)}
                                    style={{ width: 180, marginLeft: 20, marginTop: 20 }}
                                    label="First name"
                                    defaultValue=""
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    onChange={event => setLasttName(event.target.value)}
                                    style={{ width: 180, marginLeft: 20, marginTop: 20 }}
                                    label="Last name"
                                    defaultValue=""
                                />
                            </Stack>
                            <Stack spacing={2} style={{marginLeft:100 }}>
                                
                                <TextField
                                    required
                                    id="outlined-required"
                                    onChange={event => setPassport(event.target.value)}
                                    style={{ width: 550, marginTop: 20 }}
                                    label="Passport number"
                                    defaultValue=""
                                />

                            </Stack>
                            <Stack direction="row" spacing={2} style={{ marginTop: 20, marginLeft: 100 }}>


                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        label="Date of birth"
                                        value={dob}
                                        onChange={(newValue) => {
                                            setDOB(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} style={{ width: 550 }} />}
                                    />
                                </LocalizationProvider>
                            </Stack>

                            <TextField
                                id="outlined-required"
                                label="Nationality"
                                value={homeCountry}
                                onChange={handleChangeHomeCountry}
                                style={{ width: 550, marginLeft: 100, marginTop: 20 }}
                            >
                            </TextField>
                            <p style={{ color: 'red' }}>
                                {error}
                            </p>
                        
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button variant="contained" style={{ color: 'white', width: 550, marginLeft: 100, marginTop: -5, backgroundColor: '#161342' }} onClick={() => {
                               if(firstName==''||lastName==''||passport==''||email==''||password==''){
                                   alert('Please complete all required fields')
                               }else{
                               axios.post('http://localhost:8080/usersRegister', {

                                    firstName: firstName,
                                    lastName: lastName,
                                    passport: passport,
                                    email: email,
                                    password: password

                                })
                                    .then(function (response) {
                                        console.log("xxx");
                                        console.log(response.data)
                                        console.log("added succesfully")
                                        handleClick();

                                    }).catch(error => {
                                        console.log(error.response)
                                        //  setError(error.response.data);
                                    })
                                }
                            }




                            } >
                                Create your account
                            </Button>

                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" style={{ width: 500 }} style={{ backgroundColor: 'green', color: 'white' }}>
                                    Account created successfully
                                </Alert>
                            </Snackbar>


                        </Stack>


                    </Stack>
                </Paper>
                <br />
                <br />
                <br />
            </div>
        </div >
    )
}

export default CreateAccount
