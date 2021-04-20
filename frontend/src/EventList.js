import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

// EventList - a list of events.
const EventList = ({events, keyword}) => {
  // Establish variables.
  const [input, setInput] = useState('');
  const [eventList, seteventList] = useState(events);
  const [rsoUpdated, setRsoUpdated] = useState(false);

  // RSO list and cookies.
  const { error, isPending, data: rsos } = useFetch("http://localhost:3002/api/rso");
  const { error: error2, isPending: isPending2, data: rsoEvents } = useFetch("http://localhost:3002/api/event/rso");
  const cookies = new Cookies();

  // getRSOEvents - Get RSO-only events associated with RSOs the user's in.
  const getRSOEvents = () => {

    // If this is a guest user, just leave.
    if(cookies.get("user") == undefined)
    {
      setRsoUpdated(true);
      return;
    }

    // Get the RSOs the user is a member of.
    console.log("Getting RSO events...");
    var newEventList = eventList;
    var memberships = rsos.filter(rso => (rso.users.filter(user => user.uid == cookies.get("user")).length !== 0));

    // In each RSO, find RSO-only events and add them to the list.
    memberships.forEach(rso =>
    {
      rso.events.forEach(event =>
      {
        // Events must be retrieved from rsoEvents to ensure the _id is valid.
        // If the event was deleted from the main event array, eventObj will just be [].
        if(event.isRSO)
        {
          const eventObj = rsoEvents.filter(rsoEvent => (event.event_name === rsoEvent.event_name && event.created_at === rsoEvent.created_at));
          newEventList = newEventList.concat(eventObj);
        }
      })
    });
    events = newEventList;
    seteventList(newEventList);
    setRsoUpdated(true);
  }

  // Update the search bar input.
  const updateSearch = async (input) => {
    // Get the list, filtered by type.
    const filteredByType = events.filter(event => {
      return event.event_name.toLowerCase().includes(input.toLowerCase())})
    
    // Set the event list to contain the filtered elements.
    setInput(input);
    seteventList(filteredByType);
  }

  // toReadableDT - Convert the MongoDB date string to something more readable.
  const toReadableDT = (mongoDate) => {
    // Months in English abbreviations.
    const monthAbbrs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Convert to Date object and extract the values.
    const dateObj = new Date(mongoDate);
    const year = dateObj.getFullYear();
    const month = monthAbbrs[dateObj.getMonth()];
    const date = dateObj.getDate();
    var hour = dateObj.getHours();
    const minute = dateObj.getMinutes();

    // Check whether it's AM or PM and adjust further based on value.
    const isAM = (hour < 12);
    if(isAM && hour === 0)
      hour = 12;
    else if(!isAM && hour !== 12)
      hour -= 12;

    // Convert to a string.
    const timeStr = month + " " + date + " " + year + ", " + hour + ":" + minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    // Add whether it's AM or PM and return.
    if(isAM)
      return timeStr + " AM";
    else
      return timeStr + " PM";
  }

  // set the css styling for search bar
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  
  // Create the event list.
  return (
    <div className="event-list">
      { error && <div>{ error }</div> }
      { error2 && <div>{ error2 }</div>}
      { (isPending || isPending2) && <div>Loading...</div> }
      { (rsos && rsoEvents && !rsoUpdated) && <div>
        {getRSOEvents()}
        Still loading...
        </div>}
      { (rsos && rsoEvents && rsoUpdated) && (<div>
          <input 
              style={BarStyling}
              key="random1"
              value={input}
              placeholder={"search notes by type"}
              onChange={(e) => updateSearch(e.target.value)}
          />
          {eventList.map(event => (
            <div className="event-preview" key={event._id} >
              {console.log(event._id)}
              <Link to={`/event/${event._id}`}>
                <h2>{ event.event_name }</h2>
                <p>Date: { toReadableDT(event.date) }</p>
                <p>Location: { event.location }</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
// Export the function.
export default EventList;