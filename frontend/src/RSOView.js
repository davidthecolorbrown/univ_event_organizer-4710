import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

// RSOView - A viewer for an RSO.
const RSOView = () => {
  
    // Get the event ID.
    const { id } = useParams();
    console.log("id: " + id);

    // consts for membership states.
    const notChecked = -1;
    const notLoggedIn = 0;
    const notMember = 1;
    const member = 2;

    const [membership, setMembership] = useState(notChecked);

    // Get the history and cookies.
    const history = useHistory();
    const cookies = new Cookies();
  
    // Get RSO data.
    const { data: rso, error, isPending } = useFetch('http://localhost:3002/api/rso/' + id);

    // inRSO - Return a message if the user is a member of the RSO.
    const inRSO = () => {
        const userID = cookies.get("user");
        if(userID === undefined)
        {
          setMembership(notLoggedIn);
          return "";
        }
        
        // See if this user's ID is in the RSO's user list.
        const filtered = rso.users.filter(user => {return user.uid == userID});
        if(filtered && filtered.length > 0)
        {
          setMembership(member);
          return "You are a member of this RSO.";
        }
        setMembership(notMember);
        return "You are not a member of this RSO.";
    }

    // joinRSO - Add the user to this RSO.
    const joinRSO = async () => {
      const thisUser = await fetch('http://localhost:3002/api/user/' + cookies.get('user'));
      const newUserList = await rso.users.concat(thisUser);
      console.log(await newUserList);
      const update = ({["users"]: await newUserList});

      // Stringify the update and PUT it to MongoDB.
      fetch('http://localhost:3002/api/rso/' + id, {
        method: 'PUT',
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
      }).then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });

      // Reload the page.
      history.push('/rso/' + id);
    }
    
    // leaveRSO - Remove the user from this RSO.
    const leaveRSO = () => {
      const newUserList = rso.users.filter(member => member.uid != cookies.get('user'));
      console.log(newUserList);
      const update = ({["users"]: newUserList});

      // Stringify the update and PUT it to MongoDB.
      fetch('http://localhost:3002/api/rso/' + id, {
        method: 'PUT',
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
      }).then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });

      // Reload the page.
      history.push('/rso/' + id);
    }
  
    // Render the RSOView component.
    return (
      <div className="event-details">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { (rso && membership === notChecked) && <div>{inRSO()}</div>}
        { rso && (
          <article>
            <h2>{ rso.name }</h2>
            <hr/><br/>
            {rso.description}<br/>
            <br/><br/>
          </article>
        )}
        { membership === member && (
          <div>
            You are a member of this RSO.<br/>
            <br/><hr/><br/>
            <button onClick={leaveRSO}>Leave this RSO</button>
          </div>
        )}
        { membership === notMember && (
          <div>
            You are not a member of this RSO.<br/>
            <br/><hr/><br/>
            <button onClick={joinRSO}>Join this RSO</button>
          </div>
        )}
      </div>
    );
  }
   
  // Export the view.
  export default RSOView;