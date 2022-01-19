import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBarr from './AppBarr';
import LoginPage from './LoginPage';
import BaggageAllowance from './BaggageAllowance';
import Transacc from './Transacc';
import CreateAccount from './CreateAccount';
import Admin from './Admin';
import Searchu from './Searchu'
import SearchResults from './SearchResults';
import Footer from './Footer';
import SearchRes from './SearchRes'
import Seats from './Seats'
import ReservedFlights from './ReservedFlights'
import ReturnSeats from './ReturnSeats'
import Search from './Search';
import Summary from './Summary';
import EditSeats from './EditSeats'
import SearchEdit from './SearchEdit'
import ChangeFlight from './ChangeFlight'
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import NewSeats from './NewSeats';
import NewSummary from './NewSummary';

function HomePage() {

    return (
        <div className='page-container'>
        <div className='content-wrap'> 

        </div>
   

        <div>
           
            <BrowserRouter>
                <AppBarr />
                <Routes>
                     <Route path='/' element={<Searchu />}> </Route>
                   
                    <Route path='/BaggageAllowance' element={<BaggageAllowance />}> </Route>
                    <Route path='/Transacc' element={<Transacc />}> </Route>
                    <Route path='/SignUp' element={<CreateAccount />}> </Route>
                    <Route path='/Login' element={<LoginPage />}> </Route>
                    <Route path='/Admin' element={<Admin />}> </Route>
                    <Route path='/Search' element={<Searchu />}> </Route>
                    <Route path='/SearchResults' element={<SearchResults />}> </Route>
                    <Route path='/SearchRes' element={<SearchRes />}> </Route>
                    <Route path='/Seats' element={<Seats />}> </Route>
                    <Route path='/returnSeats' element={<ReturnSeats />}> </Route>
                    <Route path='/Summary' element={<Summary />}> </Route>
                    <Route path='/ReservedFlights' element={<ReservedFlights/>}> </Route>
                    <Route path='/EditSeats' element={<EditSeats/>}> </Route>
                    <Route path='/SearchEdit' element={<SearchEdit/>}> </Route>
                    <Route path='/ChangeFlight' element={<ChangeFlight/>}> </Route>
                    <Route path='/UserProfile' element={<UserProfile/>}> </Route>
                    <Route path='/ChangePassword' element={<ChangePassword/>}> </Route>
                    <Route path='/EditProfile' element={<EditProfile/>}> </Route>
                    <Route path='/NewSeats' element={<NewSeats/>}> </Route>
                    <Route path='/NewSummary' element={<NewSummary/>}> </Route>
                    <Route path='/SignUp' element={<CreateAccount/>}> </Route>
                </Routes>
                <Footer />
            </BrowserRouter>

        </div>
        </div>
    )
}

export default HomePage
