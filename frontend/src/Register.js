import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

// Register - A page that allows the registration of users.
const Register = () => {
  // Variables to edit.
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [pw, setPW] = useState();
  const [pw2, setPW2] = useState();

  // Get the history and cookie object.
  const history = useHistory();
  const cookies = new Cookies();

  async function handleSubmit(e) {
    e.preventDefault();

    // Check that the username is not already in use.
    try
    {
      var out = await fetch('http://localhost:3002/api/reg/unique/' + login);
      var json = await out.json();
      console.log(json);
      
      // Here, it's guaranteed that the username is in use.
      alert("The username is already in use.");
      return;
    }

    // If the username is in use, out.json will throw a SyntaxError.
    // This catch just continues.
    catch(error) { console.log("Username is unique."); }

    // Check that the two passwords are the same. If not, throw a message.
    if(pw !== pw2)
    {
      alert("Passwords do not match!");
      return;
    }
    
    // Build the user object.
    const user = {firstname, lastname, email, login, pw};

    // Post the user as a JSON string.
    fetch('http://localhost:3002/api/user', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(() => {
      // Register user cookie.
      setCookie();

      // Go to the home page.
      history.push('/');
    })
  }

  // setCookie - Get the new user and set the cookie.
  async function setCookie() {
    try
    {
      var out = await fetch('http://localhost:3002/api/user/' + login + '/' + pw);
      var json = await out.json();

      // Register user cookie.
      cookies.set('user', json.uid, { path: '/' });
    }
    catch(e)
    { console.log(e); }
  }

  // Return the page.
  return (
    <div className="add-comment">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label><br/>
        <input 
          type="text" 
          required 
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        /><br/>
        <label>Last Name:</label><br/>
        <input 
          type="text"
          required
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        ></input><br/>
        <label>Email:</label><br/>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/><hr/><br/>
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
        /><br/>
        <label>Confirm password:</label><br/>
        <input
          type="password"
          required
          value={pw2}
          onChange={(e) => setPW2(e.target.value)}
        /><br/><br/>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;