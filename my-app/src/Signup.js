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

function Signup(){
  const [usersList, setUsersList] = useState("")
  

  useEffect(() => {
    axios.get("http://localhost:8080/showUser").then(res => {
      setUsersList(res.data);
    })
  })

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked) {
      axios.post('http://localhost:8080/signup', {
        FirstName:firstname,
        LastName:lastname,
        Username:username,
        Address:address,
        CountryCode:countryCode,
        PassportNo:passportNumber,
        PhoneNumber:phoneNumber,
        Password:password,
        Email:email,
        DateOfBirth:dateofbirth
        
      })
        .then(function (response) {
          // console.log("xxx");
        })
      // setShow(false);
      setClicked(false);
    }
  });
  const [username, setUsername] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode,setCountryCode] = useState("");
  const [passportNumber,setPassportNo] = useState("");
  const [phoneNumber, setPhone] = useState("");

  const [password,setpassword] = useState("");
  const [email,setemail] = useState("");
  const [dateofbirth,setDateOfBirth] = useState("");


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
            Sign up
          </h2>
          <input required="true" type="text" placeholder="First Name" onChange={event => setFirstName(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="text" placeholder="Last Name" onChange={event => setLastName(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="password" placeholder="Password" onChange={event => setpassword(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="text" placeholder="Address" onChange={event => setAddress(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="text" placeholder="Passport Number" onChange={event => setPassportNo(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="tel" placeholder="Country Code" onChange={event => setCountryCode(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="text" placeholder="Phone Number" onChange={event => setPhone(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="text" placeholder="Email" onChange={event => setemail(event.target.value)}/>
          <br/>
          <br/>
          <input required="true" type="date" placeholder="Date of birth" onChange={event => setDateOfBirth(event.target.value)}/>
          <br/>
          <br/>
          {/* <div  className="links">
                <a href="/Login" >Existing User</a></div> */}
          <button onClick={()=>{
            
          }} >Signup</button>
          <br/>
 
          {/* <button onClick={()=>{
            navigate("/Landing");
          }} >Back</button> */}
          <a 
                    
                 href="/Landing" >Back</a>

        </div>
        </div>
      );
    
}
export default Signup;