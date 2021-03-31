//

//
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//
const EventList = ({events, keyword}) => {

  // 
  const [input, setInput] = useState('');
  const [eventList, seteventList] = useState(events);

  // update search bar input
  const updateSearch = async (input) => {
    //  
    const filteredByType = events.filter(event => {
      //
      return event.type.toLowerCase().includes(input.toLowerCase())
    })
      
    //console.log("input: " + input);
    //console.log("filteredByType: " + filteredByType);
    
    //
    setInput(input);
    seteventList(filteredByType);
  }

  // set the css styling for search bar
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  
  // 
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
            <p>Date: { event.date }</p>
            <p>Location: { event.location }</p>
            <p>Type: { event.type }</p>
            <p>Description: { event.description }</p>
            <p>RSO: { event.isRSO }</p>
            <p>Event ID: { event.event_id }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
// Export the function.
export default EventList;