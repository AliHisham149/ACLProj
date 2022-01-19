import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from '@mui/material/Button';
import CardActions from "@material-ui/core/CardActions";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { IconButtons } from "@mui/material";
import { IconButton } from "@mui/material";
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function ChangePassword() {
    const navigate=useNavigate();
    const [loginClicked, setLoginClicked] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
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


    const handleClickSB = () => {
        setOpenSnackBar(true);
    }

    const handleCloseSB = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }

    const [loginClicked2, setLoginClicked2] = useState(false);

    const handleLoginClicked2 = (event) => {
        setLoginClicked2(true);
    };

    const [helpButton2, setHelpButton2] = useState(false);

    const handleHelpClicked2 = (event) => {
        setHelpButton(true);
    };

    const handleChange2 = (prop) => (event) => {
        setValues({ ...values2, [prop]: event.target.value });
    };

    const handleClickShowPassword2 = () => {
        setValues2({
            ...values2,
            showPassword: !values2.showPassword,
        });
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };
    const [values2, setValues2] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    function ChangePassword() {
        axios.post('http://localhost:8080/changeMyPassword', {
            oldPassword:oldPassword,
            newPassword:newPassword

        })
            .then(function (response) {
                console.log("xxx");
                console.log(response.data._id);
                console.log(response);
                handleClickSB();
                //setID(response._id)



            }).catch(error => {
                console.log(error)
                //setError(error.response.data);
            })

    }
    return (
        <div>
            <div

                id='intro-example'
                className='p-5 text-center bg-image'
                style={{
                    background: `url('https://www.puredestinations.co.uk/wp-content/uploads/2016/06/header-Qatar-Airways-introduces-Dreamliner-aircraft-to-Birmingham-International-Airport--1600x500.jpg')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: 600, width: window.screen.width,
                    marginTop: 410,

                }}


            >

                <Typography style={{ fontSize: 20, fontWeight: "bold", marginTop: 450, marginLeft: 50, color: ' #5c0931' }}

                    align="left"
                    gutterBottom
                >
                    <Link style={{ color: '#5c0931' }} color='#5c0931' href="#" onClick={() => navigate("/UserProfile")}>Profile</Link> > Change password

                </Typography>
            </div>

            <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 50, color: ' #5c0931', marginTop: -50 }} />

           

            <Card
                style={{
                    width: 700,
                    height: 80,
                    marginLeft: 400,
                    marginTop: 0,
                    backgroundColor: ' #5c0931', opacity: 0.9
                }}
            >
                <CardContent>
                    <Typography
                        style={{ fontWeight: "bold", color: 'white', fontSize: 28 }}
                        //color="textPrimary"
                        align="center"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Change Password         </Typography>


                </CardContent>
            </Card>
            <Card
                style={{
                    width: 700,
                    height: 400,
                    marginLeft: 400,
                    marginTop: 0,
                    backgroundColor: "#EBECF0", opacity: 0.9
                }}
            >
                <CardContent>
                    <Typography
                        style={{ fontWeight: "bold", color: ' #5c0931',fontSize:17 }}
                        //color="textPrimary"
                        align="left"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Please enter your old password
                    </Typography>
                  

                    <TextField style={{ marginLeft: 10, marginTop: 20, width: 250 }} id="outlined-basic" label=" " variant="outlined" />
                    <br />
                    <br />
                    

                    <Typography
                        style={{ fontWeight: "bold", color: ' #5c0931',fontSize:17 }}
                        //color="textPrimary"
                        align="left"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Please enter your new password
                    </Typography>
                    <br />
                    <FormControl sx={{ m: 1, width: '25ch' }} style={{ marginLeft: 10, width: 250 }} variant="outlined">
                        {/* <InputLabel htmlFor="outlined-adornment-password">Enter your password</InputLabel> */}
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    {/* <TextField style={{marginLeft:-300,marginTop:10}} id="outlined-basic" label="New Password" variant="outlined" /> */}



                    <Stack spacing={2} sx={{ width: '20' }}>
                        <div style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginleft: -30
                        }}>
                            <Button style={{ background: '#5c0931', fontSize: 17, marginTop: 20, marginLeft: 270, width: 150, color: 'white' }} variant="secondary" onClick={()=>ChangePassword()} >Submit</Button>
                            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSB} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
                                    Password changed successfully
                                </Alert>


                            </Snackbar>

                        </div>
                    </Stack>



                </CardContent>
            </Card>
            <br />
            <br />
        </div>
    )
}


export default ChangePassword;