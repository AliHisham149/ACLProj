import * as React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import "./styles.css";

function Confirm() {

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Confirmation
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Do you want to confirm on reserving this flight?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained">yes </Button>
                    <Button variant="contained">No</Button>
                </CardActions>
            </Card>

        </div>
    )
}

export default Confirm;
