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
import Landing from "./Landing";

function Login(){
  const [usersList, setUsersList] = useState("")
  

  useEffect(() => {
    axios.get("http://localhost:8080/showUser").then(res => {
      setUsersList(res.data);
    })
  })
  const mainUser = usersList[0]
  localStorage.setItem("User",mainUser);
  // console.log(usersList)

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
          <input required="true" type="text" placeholder="Username" />
          <br/>
          <input required="true" type="text" placeholder="Password" />
          <br/>
          {/* <div  className="links">
                <a href="/Login" >Existing User</a></div> */}
          <button onClick={()=>{
            navigate("/User");
          }} >Submit</button>
          <br/>

          {/* <button onClick={()=>{
            navigate("/Landing");
          }} >Back</button> */}
          <a 
                    
                 href="/ Landing" >Back</a>

        </div>
        </div>
      );
    
}
export default Login;