import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from 'react';

// EventDetails - A viewer for an event.
const EventDetails = () => {
  
  // Get the event ID.
  const { id } = useParams();
  console.log("id: " + id);

  // Get event data.
  const { data: event, error, isPending } = useFetch('http://localhost:3002/api/event/' + id);
  
  // Get history.
  const history = useHistory();

  // Create an empty event to hold all updates.
  const [update, setUpdate] = useState({})

  // Valid maximum date per month.
  const monthMax = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Current month and year.
  // They are consts since they need to be updateable and accessible
  // without having to crack open the Date object.
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [newDate, setNewDate] = useState(null);
  const [isAM, setIsAM] = useState(null);

  // handleDelete - Handle the deletion of the event.
  const handleDelete = () => {
    
    // Summon a message for confirmation.
    var deleteNote = window.confirm("Are you sure you want to delete this note?");

    console.log('User input: ' + deleteNote);

    // Only delete if user confirms they want to delete.
    if (deleteNote === true)
    {
      fetch('http://localhost:3002/api/event/' + event._id,
            {method: 'DELETE'}).then(() => {history.push('/');}) 
    } 
  }

  // handleUpdate - Process an update.
  const handleUpdate = () => {
    console.log("handle update running!");
    console.log('/note/update/' + event._id);

    // Stringify the update and PUT it to MongoDB.
    fetch('http://localhost:3002/api/event/' + event._id, {
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
    history.push('/');
    console.log('handleUpdate!');
    console.log(update);
  }

  // calcMaxDay - Calculate the maximum day value allowed.
  const calcMaxDay = () =>
  {
    // Check leap year conditions if February.
    if(month == 2)
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

  // handleChange - Update the state of update.
  function handleChange(change)
  {
    console.log(change.target.name + " | " + change.target.value + "\n");

    // If the change was to type, edit isPrivate and isRSO based on the value
    // (which is the name of the radio button selected).
    if(change.target.name === "type")
    {
      if(change.target.value === "public")
        setUpdate({...update, ["isPrivate"]: false, ["isRSO"]: false});
      else if(change.target.value === "private")
        setUpdate({...update, ["isPrivate"]: true, ["isRSO"]: false});
      else if(change.target.value === "rso")
        setUpdate({...update, ["isPrivate"]: false, ["isRSO"]: true});
    }

    // If this is a change to a time value,
    // create a new Date object with the new value
    // and edit the global variables if necessary.
    else if(change.target.name === "month")
    {
      setMonth(change.target.value);
      newDate.setMonth(change.target.value - 1);
      setUpdate({...update, ["date"]: newDate, ["time"]: newDate});
    }
    else if(change.target.name === "day")
    {
      newDate.setDate(change.target.value);
      setUpdate({...update, ["date"]: newDate, ["time"]: newDate});
    }
    else if(change.target.name === "year")
    {
      setYear(change.target.value);
      newDate.setFullYear(change.target.value);
      setUpdate({...update, ["date"]: newDate, ["time"]: newDate});
    }
    else if(change.target.name === "hour")
    {
      // Set the new hour based on the value of isAM.
      if(isAM)
      {
        if(change.target.value === 12)
          newDate.setHours(0);
        else
          newDate.setHours(change.target.value);
      }
      else
      {
        if(change.target.value === 12)
          newDate.setHours(change.target.defaultValue);
        else
          newDate.setHours(change.target.value + 12);
      }
      setUpdate({...update, ["date"]: newDate, ["time"]: newDate});
    }
    else if(change.target.name === "minute")
    {
      newDate.setMinutes(change.target.value);
      setUpdate({...update, ["date"]: newDate, ["time"]: newDate});
    }
    else if(change.target.name === "isAM")
    {
      setIsAM(change.target.value);

      // Adjust the hour to meet the current AM/PM setting.
      if(change.target.value === true)
        newDate.setHours(newDate.getHours() - 12);
      else
        newDate.setHours(newDate.getHours() + 12);
      
      setUpdate({...update, ["date"]: newDate, ["time"]: newDate});
    }

    // Everything else can be handled easily.
    else
      setUpdate({...update, [change.target.name]: change.target.value});
    console.log("state changing");
  }

  // handleCancel - If cancel button is pushed, go to homepage.
  const handleCancel = () => {
      history.push('/');
  }

  // getMonth - If the month variable has not been set yet, set it.
  //            Otherwise, return the current value.
  const getMonth = () => {
    if(month === 0)
    {
      // Get the date object.
      const dateObj = new Date(event.date);

      // Save the object as newDate for later and set isAM.
      setNewDate(dateObj);
      setIsAM(dateObj.getHours() < 12);

      // Save and return the month value.
      setMonth(dateObj.getMonth() + 1);
      return dateObj.getMonth() + 1;
    }
    return month;
  }

  // getYear - Same as above but with year.
  const getYear = () => {
    if(year === 0)
    {
      const dateObj = new Date(event.date);
      setYear(dateObj.getFullYear());
      return dateObj.getFullYear();
    }
    return year;
  }

  // getInitialHour - Return the initial value of hour.
  const getInitialHour = () => {
    const rawHour = new Date(event.date).getHours();
    if(rawHour === 0)
      return 12;
    else if (rawHour <= 12)
      return rawHour;
    else
      return rawHour - 12;
  }

  // Render the EditNote component.
  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { event && (
        <article>
        <div className="create">
          <h2>Editing { event.event_name }...</h2>
          <form onSubmit={handleUpdate}>
            <label>Name: </label>
            <input 
              name="event_name"
              type="text"
              required
              defaultValue={event.event_name}
              onChange={handleChange}
            />
            <br/>
            <label>Location: </label>
            <input 
              name="location"
              type="text"
              required
              defaultValue={event.location}
              onChange={handleChange}
            />
            <br/>
            <label>Date:</label>
            <select
              name="month"
              /* Don't remove the parentheses, or defaultValue will be 0! */
              defaultValue={getMonth()}
              onChange={handleChange}
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
              name="day"
              defaultValue={new Date(event.date).getDate()}
              onChange={handleChange}
              type="number"
              min="1"
              max={calcMaxDay()}
            />
            <input
              name="year"
              /* Don't remove the parentheses, or defaultValue will be 0! */
              defaultValue={getYear()}
              onChange={handleChange}
              type="number"
              min="1"
            />
            <label>Time:</label>
            <input
              name="hour"
              defaultValue={getInitialHour()}
              onChange={handleChange}
              type="number"
              min="1"
              max="12"
            />:
            <input /* FIXME - Is there a way to always make this two digits? */
              name="minute"
              defaultValue={new Date(event.date).getMinutes()}
              onChange={handleChange}
              type="number"
              min="0"
              max="59"
            />
            <select
              name="isAM"
              defaultValue={(new Date(event.date).getHours()) < 12}
              onChange={handleChange}
            >
              <option value="true">AM</option>
              <option value="false">PM</option>
            </select>
            <label>Type: </label>
            <div onChange={handleChange}>
              <input type="radio" name="type" value="public" defaultChecked={!event.isRSO && !event.isPrivate} /> Everyone
              <input type="radio" name="type" value="private" defaultChecked={event.isPrivate} /> Students only
              <input type="radio" name="type" value="rso" defaultChecked={event.isRSO} /> RSO members only
            </div>
            <br/>
            <br/>
            <label>Description: </label>
            <textarea name="description" defaultValue={event.description} onChange={handleChange} />
            <br/><br/>
            <button type="submit" > Update </button>
          </form>
          
          <div><button onClick={handleDelete}>Delete</button></div>
          <div><button onClick={handleCancel}>Cancel</button></div>
        </div>
        </article>
      )}
    </div>
  );
}
 
// Export the view.
export default EventDetails;