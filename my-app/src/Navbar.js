import Login from './Login';
import Admin from './Admin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import User from "./User";
import SelectedFlight from "./SelectedFlight";
import Summary from './Summary';
// import ChooseSeats from './ChooseSeats'
import Landing from './Landing';
import {useNavigate} from 'react-router-dom';
import Itinerary from './itinerary';
import Profile from './Profile';
import ChooseSeats from './ChooseSeats'
import Summary2 from './Summary2'
import GuestUser from "./GuestUser"
import Signup from "./Signup"

const Navbar = () => {
    return(
        
        <nav className='navbar'>
        <h1 className="Website-header" align="center">No Way Home Airlines</h1>
        <div   className="links">
            <a onClick={()=>{
                localStorage.setItem("loggedin",true);
            }} href="/Login" >Login</a>
            <br/>
            <a onClick={()=>{
                localStorage.setItem("loggedin",false);}}href="/GuestUser" >Guest </a>
            <br/>
            <a  href="/Admin" >Admin</a>

        </div>
            
            
            <Router>
      
      {/* <Login></Login> */}
        <Routes>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/User" element={<User />} />
            <Route path="/Signup" element={<Signup />} />

            <Route path="/GuestUser" element={<GuestUser />} />

            <Route path="/SelectedFlight" element={<SelectedFlight/>}/>
            <Route path="/Summary" element={<Summary />} />
            <Route path="/ChooseSeats" element={<ChooseSeats />} />
            <Route path="/Summary2" element={<Summary2 />} />
            <Route path= "/Landing" element={<Landing/>}/>
            <Route path= "/itinerary" element={<Itinerary/>}/>
            <Route path="/Profile" element={<Profile/>}/>
           



            
              
        </Routes>
          
          
          
          </Router>
            </nav>

    )
}
export default Navbar;