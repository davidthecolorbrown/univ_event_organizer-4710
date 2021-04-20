import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

// Register - A page that allows the registration of users.
const Logout = () => {
  // Get the history and cookie object.
  const history = useHistory();
  const cookies = new Cookies();

  // Delete the cookie, refresh, and go home.
  cookies.remove('user');
  window.location.reload();
  history.push('/');

  // Return the page.
  return (
    <div className="logout">
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;