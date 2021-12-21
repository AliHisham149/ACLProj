import Login from './Login';
import Admin from './Admin';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import User from "./User";

const Navbar = () => {
    return(
        
        <nav className='navbar'>
            <h1 className="Website-header" align="center">No Way Home Airlines</h1>
            <div   className="links">
                <a href="/Login" >Existing User</a>
                <br/>
                <a href="/Admin" >Admin</a>

            </div>
            
            
            <Router>
      
      {/* <Login></Login> */}
        <Routes>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/User" element={<User />} />
            
              
        </Routes>
          
          
          
          </Router>
            </nav>

    )
}
export default Navbar;