import { useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

// Create - A page that allows the creation of new events.
const Create = () => {
  // Define the fields.
  const [location, setLocation] = useState('');
  const [event_name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [type, setType] = useState('Public');

  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(2021);

  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);

  const [RSO, setRSO] = useState(-1);

  // RSO list.
  const { error, isPending, data: rsos } = useFetch("http://localhost:3002/api/rso");

  // Type constants.
  const publicType = "Public";
  const privateType = "Private";
  const rsoType = "RSO";

  // Valid maximum date per month.
  const monthMax = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Get the history and cookie object.
  const history = useHistory();
  const cookies = new Cookies();

  // Fetch the RSO object.
  const fetchRSO = () => {
    try {return Promise.all([fetch('http://localhost:3002/api/rso' + RSO).then((r) => r.json())]);}
    catch(e) {throw e};
  }

  // Add a new event to the database.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set isRSO and isPrivate based on type value.
    const isPrivate = (type === privateType);
    const isRSO = (type === rsoType);

    // Create the Date object.
    const date = new Date(year, month - 1, day, hour, minute, 0);

    // Adjust the hour if it's PM or 12 AM.
    if(isAM === false && date.getHours() !== 12)
      date.setHours(hour + 12);
    else if(isAM === true && date.getHours() === 12)
      date.setHours(0);

    // Set the transitional values.
    const note = description;
    const title = event_name;
    const time = date;

    // If the user is not an RSO manager, publish with a flag so that the superadmin knows to review it.

    // Set created_at to the current time.
    const created_at = new Date();

    // Create an empty comment array.
    const comments = [];

    // Define the event.
    const event = {location, event_name, description, isRSO, isPrivate, type, title, note, time, comments, date, created_at};

    // Get the RSO object if applicable and see if the user can add something to it.
    if(RSO != -1)
    {
      var rsoObj = rsos.filter(rso => rso.rso_id == RSO)[0];
      if(cookies.get('user') != rsoObj.admin)
      {
        alert("You don't have permission to add events for this RSO.");
        return;
      }
      else
      {
        // Create the update.
        const newEventList = rsoObj.events.concat(event);
        const update = ({["events"]: newEventList});
        
        fetch('http://localhost:3002/api/rso/' + rsoObj.rso_id, {
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
      }
    }

    // Post the event as a JSON string.
    fetch('http://localhost:3002/api/event', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    }).then(() => {
      //
      history.push('/');
    })
  }

  // calcMaxDay - Calculate the maximum day value allowed.
  const calcMaxDay = () =>
  {
    // Check leap year conditions if February.
    if(month === 2)
    {
      
      if (year % 4 !== 0)
        return 28;
      else if (year % 100 !== 0)
        return 29;
      else if (year % 400 !== 0)
        return 28;
      else
        return 29;
    }
    else
      return monthMax[month - 1];
  }

  // generateRSOList - generate the RSO list.
  const generateRSOList = () => {
    let items = [];
    items.push(<option value="-1">None</option>);
    rsos.forEach(this_rso => {
      items.push(<option value={this_rso.rso_id}>{this_rso.name}</option>);
    });    
    return items;
  } 

  // Return the page.
  // FIXME - Make some of this non-centered.
  return (
    <div className="create">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { rsos && (<div>
          <h2>Create a New Event</h2>
          <form onSubmit={handleSubmit}>
            <label>Event name:</label>
            <input 
              type="text" 
              required 
              value={event_name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* If user is an admin, select an affiliated RSO */}
            <label>Date:</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sept</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              type="number"
              min="1"
              max={calcMaxDay()}
            />
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              type="number"
              defaultValue="2021"
              min="1"
            />
            <label>Time:</label>
            <input
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              type="number"
              min="1"
              max="12"
            />:
            <input /* FIXME - Is there a way to always make this two digits?*/
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              type="number"
              min="0"
              max="59"
            />
            <select
              value={isAM}
              onChange={(e) => setIsAM(e.target.value === "true")}
            >
              <option value="true">AM</option>
              <option value="false">PM</option>
            </select>
            <label>Description:</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <label>Location:</label>
            {/* FIXME: We're supposed to put a maps widget here that gets placename, longitude, and latitude. */}
            <input 
              type="text" 
              required 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label>Visibility:</label>
            <div>
              <input type="radio" value="public" checked={type === publicType} onChange={(e) => setType(publicType)} /> Everyone
              <input type="radio" value="private" checked={type === privateType} onChange={(e) => setType(privateType)} /> Students only
              <input type="radio" value="rso" checked={type === rsoType} onChange={(e) => setType(rsoType)} /> RSO members only
            </div>
            <label>RSO:</label>
            <select
              value={RSO}
              onChange={(e) => setRSO(parseInt(e.target.value))}
            >
              {generateRSOList()}
            </select>
            <button>Submit Event</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Create;