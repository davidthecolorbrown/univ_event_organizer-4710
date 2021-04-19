import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// Login - A page that allows users to log in.
const Login = () => {
  // Variables to edit.
  const [login, setLogin] = useState();
  const [pw, setPW] = useState();

  // Get the history object.
  const history = useHistory();

  // Add a new user to the database.
  async function handleSubmit(e) {
    e.preventDefault();

    // See whether the username/password combo exists.
    try
    {
      var out = await fetch('http://localhost:3002/api/user/' + login + '/' + pw);
      var json = await out.json();
      console.log(json);
    }

    // If the username/password combo is wrong, out.json will throw a SyntaxError.
    // This catch displays a wrong user/password error.
    catch(error)
    {
      alert("Username or password is incorrect.");
      return;
    }

    // Register user cookie here...
    
    // Go to the home page.
    // FIXME: Change to last page they were on.
    history.push('/');
  }

  // Return the page.
  return (
    <div className="login">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><br/>
        <input
          type="text"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        /><br/>
        <label>Password:</label><br/>
        <input
          type="password"
          required
          value={pw}
          onChange={(e) => setPW(e.target.value)}
        /><br/><br/>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default Login;