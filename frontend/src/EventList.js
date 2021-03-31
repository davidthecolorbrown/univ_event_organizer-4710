//

//
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// EventList - a list of events.
const EventList = ({events, keyword}) => {
  // Establish variables.
  const [input, setInput] = useState('');
  const [eventList, seteventList] = useState(events);

  // Update the search bar input.
  const updateSearch = async (input) => {
    // Get the list, filtered by type.
    const filteredByType = events.filter(event => {
      return event.type.toLowerCase().includes(input.toLowerCase())})
    
    // Set the event list to contain the filtered elements.
    setInput(input);
    seteventList(filteredByType);
  }

  // toReadableDT - Convert the MongoDB date string to something more readable.
  const toReadableDT = (mongoDate) => {
    // Months in English abbreviations.
    const monthAbbrs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Split into the date and time.
    var dateTime = mongoDate.split("T");

    // Split the date into year, month, and day.
    var dateParts = dateTime[0].split("-");

    // Parse the month and day and make a string of them.
    return monthAbbrs[parseInt(dateParts[1]) - 1] + " " + parseInt(dateParts[2]);

    //2021-03-31T01:01:04.789Z
  }

  // set the css styling for search bar
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  
  // Create the event list.
  return (
    <div className="event-list">
      <input 
          style={BarStyling}
          key="random1"
          value={input}
          placeholder={"search notes by type"}
          onChange={(e) => updateSearch(e.target.value)}
      />
      {/* {events.map(event => ( */}
      {eventList.map(event => (
        <div className="event-preview" key={event._id} >
          {console.log(event._id)}
          <Link to={`/note/${event._id}`}>
            <h2>{ event.title }</h2>
            <p>Date: { toReadableDT(event.date) }</p>
            <p>Location: { event.location }</p>
            {/*<p>Type: { event.type }</p>
            <p>Description: { event.description }</p>
            <p>RSO: { event.isRSO }</p>
            <p>Event ID: { event.event_id }</p>*/}
          </Link>
        </div>
      ))}
    </div>
  );
}
 
// Export the function.
export default EventList;