import React from 'react'


import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function Logout() {
    const [logouClicked, setLogoutClicked] = useState(false);
    return (
        <div>
             <Button variant="outline-primary" data-target="#myModal" data-toggle="modal" data-backdrop="static" data-keyboard="false" onClick={(event) => setLogoutClicked(true)}>Logout</Button> 
        </div>
    )
}

export default Logout
