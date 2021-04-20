import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

// RSOCreate - A page that allows the creation of RSOs.
const RSOCreate = () => {
  // Variables to edit.
  const [name, setName] = useState();
  const [description, setDesc] = useState();
  
  const [user1, setUser1] = useState();
  const [user2, setUser2] = useState();
  const [user3, setUser3] = useState();
  const [user4, setUser4] = useState();
  const [user5, setUser5] = useState();

  // Get the history and cookie object.
  const history = useHistory();
  const cookies = new Cookies();

  const fetchAdmin = () => {
    try {return fetch('http://localhost:3002/api/user/' + cookies.get("user")).then((r) => r.json());}
    catch(e) {console.write("Admin error"); return null};
  }

  const fetchUser1 = () => {
    try {return fetch('http://localhost:3002/api/reg/unique/' + user1).then((r) => r.json());}
    catch(e) {return null};
  }

  const fetchUser2 = () => {
    try {return fetch('http://localhost:3002/api/reg/unique/' + user2).then((r) => r.json());}
    catch(e) {return null};
  }

  const fetchUser3 = () => {
    try {return fetch('http://localhost:3002/api/reg/unique/' + user3).then((r) => r.json());}
    catch(e) {return null};
  }

  const fetchUser4 = () => {
    try {return fetch('http://localhost:3002/api/reg/unique/' + user4).then((r) => r.json());}
    catch(e) {return null};
  }

  const fetchUser5 = () => {
    try {return fetch('http://localhost:3002/api/reg/unique/' + user5).then((r) => r.json());}
    catch(e) {return null};
  }

  const fetchUsers = () => {
    try {return Promise.all([fetchAdmin(), fetchUser1(), fetchUser2(), fetchUser3(), fetchUser4(), fetchUser5()]);}
    catch(e) {throw e};
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Make sure each username is unique.
    if(user1 === user2 || user1 === user3 || user1 === user4 || user1 === user5 ||
       user2 === user3 || user2 === user4 || user2 === user5 ||
       user3 === user4 || user3 === user5 || user4 === user5)
    {
      alert("Some of the usernames are duplicates.");
      return;
    }

    // Create objects for each user.
    var adminObj, u1, u2, u3, u4, u5;

    // Get the current user's object.
    var adminEmailRoot;
    try
    {
      // Get all user objects.
      await fetchUsers().then(([rAdmin, r1, r2, r3, r4, r5]) => {
        adminObj = rAdmin;
        u1 = r1;
        u2 = r2;
        u3 = r3;
        u4 = r4;
        u5 = r5;
      }).then(() => {
        adminEmailRoot = adminObj.email.substr(adminObj.email.lastIndexOf('@') + 1);
        console.log(adminEmailRoot);
      })
    }
    catch(e)
    {
      alert("One of the users does not exist.");
      return;
    }

    // Check that each user is not the admin-to-be.
    console.log(adminObj.login + " " + u1.login + " " + u2.login + " " + u3.login + " " + u4.login + " " + u5.login);
    if(adminObj.login === u1.login || adminObj.login === u2.login || adminObj.login === u3.login ||
       adminObj.login === u4.login || adminObj.login === u5.login)
    {
      alert("Your own account should not be in the user list.");
      return;
    }

    // Check that the usernames exist and have the same address as root.
    if(adminEmailRoot !== u1.email.substr(u1.email.lastIndexOf('@') + 1))
    {
      alert("User 1 does not have the same email domain.");
      return;
    }
    if(adminEmailRoot !== u2.email.substr(u2.email.lastIndexOf('@') + 1))
    {
      alert("User 2 does not have the same email domain.");
      return;
    }
    if(adminEmailRoot !== u3.email.substr(u3.email.lastIndexOf('@') + 1))
    {
      alert("User 3 does not have the same email domain.");
      return;
    }
    if(adminEmailRoot !== u4.email.substr(u4.email.lastIndexOf('@') + 1))
    {
      alert("User 4 does not have the same email domain.");
      return;
    }
    if(adminEmailRoot !== u5.email.substr(u5.email.lastIndexOf('@') + 1))
    {
      alert("User 5 does not have the same email domain.");
      return;
    }
        
    // Build the RSO object.
    const admin = adminObj.uid;
    const users = [adminObj, u1, u2, u3, u4, u5];
    const rso = {name, description, admin, users};

    // Post the RSO as a JSON string.
    fetch('http://localhost:3002/api/rso', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rso)
    }).then(() => {
      // Go to the home page.
      history.push('/');
    })
  }

  // Return the page.
  return (
    <div className="add-comment">
      <h2>Create an RSO</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br/>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br/>
        <label>Description:</label><br/>
        <textarea
          required
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea><br/><hr/><br/>
        You will be made the admin of this RSO.<br/><br/>
        You must specify the <b>usernames</b> of five other users to join you.<br/>
        These users must be students of your university and have the same email domain.<br/>
        Others may join after the RSO is created.<br/><br/>
        <label>1st User:</label><br/>
        <input
          type="text"
          required
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
        /><br/>
        <label>2nd User:</label><br/>
        <input
          type="text"
          required
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
        /><br/>
        <label>3rd User:</label><br/>
        <input
          type="text"
          required
          value={user3}
          onChange={(e) => setUser3(e.target.value)}
        /><br/>
        <label>4th User:</label><br/>
        <input
          type="text"
          required
          value={user4}
          onChange={(e) => setUser4(e.target.value)}
        /><br/>
        <label>5th User:</label><br/>
        <input
          type="text"
          required
          value={user5}
          onChange={(e) => setUser5(e.target.value)}
        /><br/>
        <button>Create RSO</button>
      </form>
    </div>
  );
}

export default RSOCreate;