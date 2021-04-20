import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const Navbar = () => {
  // Get the cookie object.
  const cookies = new Cookies();
  const [userCookie, setUserCookie] = useState(cookies.get('user'));

  // FIXME: Make this run only when cookie is changed.
  const refreshCookie = () => {
    setUserCookie(cookies.get('user'));
  }

  return (
    <nav className="navbar">
      <h1>Event Manager</h1>
      {userCookie === undefined &&
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/rso">RSOs</Link>
          <Link to="/Register">Register</Link>
          <Link to="/Login" style={{ 
            color: 'white', 
            backgroundColor: '#000000',
            borderRadius: '8px' 
          }}>Login</Link>
        </div>}
      {userCookie !== undefined &&
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/rso">RSOs</Link>
          <Link to="/create" style={{ 
            color: 'white', 
            backgroundColor: '#000000',
            borderRadius: '8px' 
          }}>New Event</Link>
          <Link to="/Logout">Log out</Link>
        </div>}
    </nav>
  );
}
 
export default Navbar;