//import React from 'react'
import React from 'react'
import {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import UpdateFlight from './UpdateFlight';
import ReactDOM from 'react-dom';
function UpdateButton(props) {
    const[clicked,setClicked]=useState(false);
    useEffect(() => {
        if (clicked)
        ReactDOM.render(<UpdateFlight/>)
            }
   , );
    return (
        <div>
           <button onClick={(event) =>{setClicked(true)}}>
           </button> 

        </div>
    )
}

export default UpdateButton
