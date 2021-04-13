import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

// EventView - A viewer for an event.
const EventView = () => {
  
    // Get the event ID.
    const { id } = useParams();
    console.log("id: " + id);
  
    // Get event data.
    const { data: event, error, isPending } = useFetch('http://localhost:3002/api/event/' + id);

    // toReadableDate - Get a readable date.
    const toReadableDate = () => {
        // Months in English abbreviations.
        const monthAbbrs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Convert to Date object and extract the values.
        const dateObj = new Date(event.date);
        const year = dateObj.getFullYear();
        const month = monthAbbrs[dateObj.getMonth()];
        const date = dateObj.getDate();

        // Convert to a string and return.
        return month + " " + date + " " + year;
    }

    // toReadableTime - Get a readable time.
    const toReadableTime = () => {
        // Convert to Date object and extract the values.
        const dateObj = new Date(event.date);
        var hour = dateObj.getHours();
        const minute = dateObj.getMinutes();

        // Check whether it's AM or PM and adjust further based on value.
        const isAM = (hour < 12);
        if(isAM && hour === 0)
        hour = 12;
        else if(!isAM && hour !== 12)
        hour -= 12;

        // Convert to a string.
        const timeStr = hour + ":" + minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        
        // Add whether it's AM or PM and return.
        if(isAM)
            return timeStr + " AM";
        else
            return timeStr + " PM";
    }

    // typeMessage - Return a message corresponding to the type flags.
    const typeMessage = () => {
        if(event.isRSO)
            return "This event is for members of the hosting RSO only.\n";
        else if (event.isPrivate)
            return "This event is for university students only.\n";
        else
            return "";
    }
  
    // Render the EventView component.
    return (
      <div className="blog-details">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { event && (
          <article>
            <h2>{ event.event_name }</h2>
            <h3>{toReadableDate()}</h3>
            <h3>{toReadableTime()}</h3>
            <h3>{event.location}</h3>
            {typeMessage()}<br/>
            <hr/><br/>
            {event.description}
          </article>
        )}
      </div>
    );
  }
   
  // Export the view.
  export default EventView;