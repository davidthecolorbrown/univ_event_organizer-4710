import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// Register - A page that allows the registration of users.
const Register = () => {
  // Variables to edit.
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [pw, setPW] = useState();
  const [pw2, setPW2] = useState();


  // Get the history object.
  const history = useHistory();

  // Add a new user to the database.
  const handleSubmit = (e) => {
    e.preventDefault();

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
      // Go to the home page.
      history.push('/');
    })
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