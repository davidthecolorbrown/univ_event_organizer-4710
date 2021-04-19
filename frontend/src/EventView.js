import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

// EventView - A viewer for an event.
const EventView = () => {
  
    // Get the event ID.
    const { id } = useParams();
    console.log("id: " + id);
    
    const [privateBlock, setPrivateBlock] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    // Get the cookies.
    const cookies = new Cookies();
  
    // Get event data.
    const { data: event, error, isPending } = useFetch('http://localhost:3002/api/event/' + id);

    // checkPermissions - Make sure the user is allowed to see this event.
    const checkPermissions = () => {
      console.log("Checking permissions...");
      if(event.isPrivate === true && cookies.get('user') === undefined)
        setPrivateBlock(true);
    }

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

    // avgRating - Return the average rating of all comments.
    const avgRating = () => {
      if(event.comments.length === 0)
        return "No ratings yet."
      
      var ratingSum = 0;
      event.comments.forEach(comment => ratingSum += comment.rating);
      return ratingSum / event.comments.length;
    }
  
    // Render the EventView component.
    return (
      <div className="event-details">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { privateBlock && (
          <article>
            <h2>This event is only for university students.</h2>
            <div>If you are a student, please <Link to="/Login">log in</Link>.</div>
          </article>
        )}
        { (event && !privateBlock) && (
          <article>
            {checkPermissions()}
            <h2>{ event.event_name }</h2>
            <h3>{toReadableDate()}</h3>
            <h3>{toReadableTime()}</h3>
            <h3>{event.location}</h3>
            {typeMessage()}<br/>
            <hr/><br/>
            {event.description}<br/>
            <hr/><br/><br/>
            <h2>Comments</h2>
            Average rating: {avgRating()} <br/>
            {event.comments.map(comment => (
              <article>
              <div className="comments" key={comment._id}>
                {console.log(comment._id)}
                <h3>{ comment.title }</h3>
                {/* Replace with a graphic */}
                <p>Rating: {comment.rating} / 5</p>
                {/* Print Username of poster */}
                <p>Posted: { toReadableDate(comment.date) + ", " + toReadableTime(comment.date) }</p>
                <p>{ comment.body }</p>
              </div>
              </article>
            ))}
            <Link to={`/comment/${event.event_id}`}>Add a comment</Link>
          </article>
          )}
          {(event && canEdit) && (
            <article>
              <Link to={`/event/edit/${event._id}`}>Edit</Link>
            </article>
          )}
      </div>
    );
  }
   
  // Export the view.
  export default EventView;