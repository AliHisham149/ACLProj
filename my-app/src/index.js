import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Flightitinerary from './Flightitinerary'
import reportWebVitals from './reportWebVitals';
import ChooseSeat from './ChooseSeat';
import Summary from './Summary';
import DepartureList from './DepartureList'
import Searchu from './Searchu';
import User from './User';
import LoginPage from './LoginPage';
import CreateAccount from './CreateAccount';
import BaggageAllowance from './BaggageAllowance';
import Admin from './Admin';
import Transacc from './Transacc';
import HomePage from './HomePage';
//import Flightitinerary from './Flightitinerary'
ReactDOM.render(
  <React.StrictMode>
    < HomePage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
