
import React from 'react'
import Table from 'react-bootstrap/Table';
import {useState,useEffect} from 'react';
import axios from 'axios'


    

function CancelFlight(props) {
    //const[idd,setidd]=useState(flase);
 //   const[del,setidel]=useState("Delete");

   
    return (
        <div>
           
            <button onClick={(event) => axios.post('http://localhost:8080/cancelFlights', {
        _id: props.idd,
        
      })
      .then(function (response) {
        
      })}>Yes</button>


        </div>
    )
}

export default CancelFlight


