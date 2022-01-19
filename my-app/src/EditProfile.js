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
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
function EditProfile() {
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passport, setPassport] = useState("");
    const location = useLocation();
    const { id} = location.state;
    const handleClickSB = () => {
        setOpenSnackBar(true);
    }

    const handleCloseSB = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    }
    function editProfile() {
        axios.post('http://localhost:8080/editProfile', {
            firstName: firstName,
            lastName: lastName,
            passport: passport,


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
                    marginTop: 430,

                }}


            >

                <Typography style={{ fontSize: 20, fontWeight: "bold", marginTop: 450, marginLeft: 50, color: ' #161342' }}

                    align="left"
                    gutterBottom
                >
                    <Link style={{ color: '#161342' }} color='#161342' href="#" onClick={() => navigate("/UserProfile",{state:{id:id}})}>Profile</Link> >  Edit your profile

                </Typography>
            </div>

            <hr style={{ fontSize: 20, fontWeight: "bold", marginLeft: 50, color: ' #161342', marginTop: -50 }} />


            <Card
                style={{
                    width: 700,
                    height: 80,
                    marginLeft: 400,
                    marginTop: 0,
                    backgroundColor: ' #161342', opacity: 0.8
                }}
            >
                <CardContent>
                    <Typography
                        style={{ fontWeight: "bold", color: 'white', fontSize: 25 }}
                        //color="textPrimary"
                        align="center"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Edit your profile       </Typography>


                </CardContent>
            </Card>
            <Card
                style={{
                    width: 700,
                    height: 400,
                    marginLeft: 400,
                    marginTop: 0,
                    backgroundColor: "#EBECF0", opacity: 0.8
                }}
            >
                <CardContent>
                    <Typography
                        style={{ fontWeight: "bold", color: ' #161342', fontSize: 17, marginTop: 20 }}
                        //color="textPrimary"
                        align="left"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        First name
                    </Typography>
                    <TextField style={{ marginLeft: 10, marginTop: 20, width: 250 }} id="outlined-basic" label=" " variant="outlined" onChange={event => setFirstName(event.target.value)} />
                    <br />
                    <br />
                    <br />

                    <Typography
                        style={{ fontWeight: "bold", color: ' #161342', fontSize: 17, marginLeft: 300, marginTop: -157 }}
                        //color="textPrimary"
                        align="left"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Last name
                    </Typography>

                    <TextField style={{ marginLeft: 300, marginTop: 20, width: 250 }} id="outlined-basic" label=" " variant="outlined" onChange={event => setLastName(event.target.value)} />
                    <br />
                    <br />
                    <br />

                    <Typography
                        style={{ fontWeight: "bold", color: ' #161342', fontSize: 17 }}
                        //color="textPrimary"
                        align="left"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Enter your new Email
                    </Typography>


                    <TextField style={{ marginLeft: 10, marginTop: 20, width: 250 }} id="outlined-basic" label=" " variant="outlined" />
                    <br />
                    <br />
                    <br />

                    <Typography
                        style={{ fontWeight: "bold", color: ' #161342', fontSize: 17, marginLeft: 300, marginTop: -155 }}
                        //color="textPrimary"
                        align="left"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >


                        Enter your new Passport Number
                    </Typography>


                    <TextField style={{ marginLeft: 10, marginTop: 20, width: 250, marginLeft: 300 }} id="outlined-basic" label=" " variant="outlined" onChange={event => setPassport(event.target.value)} />
                    <br />
                    <br />
                    <br />
                    <Stack spacing={2} sx={{ width: '20' }}>
                        <div style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginleft: -30
                        }}>
                            <Button style={{ background: '#161342', fontSize: 20, marginTop: -20, marginLeft: 200, width: 200, color: 'white' }} variant="secondary" onClick={ (event)=>editProfile()} >Submit</Button>
                            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSB} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
                                    Your Data have been changed successfully
                                </Alert>


                            </Snackbar>

                        </div>
                    </Stack>



                </CardContent>
            </Card>
            <br />
            <br />

            <br />

















        </div>

    )
}

export default EditProfile;