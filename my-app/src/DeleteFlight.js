
import React from 'react'
import Table from 'react-bootstrap/Table';
import {useState,useEffect} from 'react';
import axios from 'axios'

    /*function clicked(props){
    axios.post('http://localhost:8080/deleteFlights', {
        _id: props.idd,
        
      })
      .then(function (response) {
        console.log("xxx");
      })}*/
    

function DeleteFlight(props) {
    //const[idd,setidd]=useState(flase);
 //   const[del,setidel]=useState("Delete");

   
    return (
        <div>
           
            <button onClick={(event) => axios.post('http://localhost:8080/deleteFlights', {
        _id: props.idd,
        
      })
      .then(function (response) {
        console.log("xxx");
      })}>Yes</button>


        </div>
    )
}

export default DeleteFlight


