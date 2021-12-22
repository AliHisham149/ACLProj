import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
// import './Login.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Admin from './Admin';
 import{ useNavigate } from 'react-router-dom';
import User from './User';
function Login(){
// function handleClick(){
 let navigate =useNavigate();

// }

    return (
        <div className="container">
          {/* <h1>Welcome to No Way Home Airlines </h1> */}
          
        <div>
          <h2>
            Login
          </h2>
          <input type="text" placeholder="Username" />
          <br/>
          <input type="text" placeholder="Password" />
          <br/>
          {/* <div  className="links">
                <a href="/Login" >Existing User</a></div> */}
          <button onClick={()=>{
            navigate("/User");
          }} >Submit</button>
        </div>
        </div>
      );
    
}
export default Login;