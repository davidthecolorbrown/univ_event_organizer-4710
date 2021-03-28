import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Event Manager</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#000000',
          borderRadius: '8px' 
        }}>New Event</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;