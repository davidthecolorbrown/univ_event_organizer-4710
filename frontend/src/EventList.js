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
  const cookies = new Cookies();

  // getRSOEvents - Get RSO-only events associated with RSOs the user's in.
  const getRSOEvents = () => {
    if(cookies.get("user") == undefined)
    {
      setRsoUpdated(true);
      return;
    }
    console.log("Getting RSO events...");
    var newEventList = eventList;
    var memberships = rsos.filter(rso => rso.users.filter(user => user.uid == cookies.get("user")));
    memberships.forEach(rso =>
    {
      rso.events.forEach(event =>
      {
        console.log(event)
        if(event.isRSO)
          newEventList.push(event);
      })
    });
    seteventList(newEventList);
    setRsoUpdated(true);
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

  // Create the event list.
  return (
    <div className="event-list">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { (rsos && !rsoUpdated) && <div>
        {getRSOEvents()}
        Still loading...
        </div>}
      { (rsos && rsoUpdated) && (<div>
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