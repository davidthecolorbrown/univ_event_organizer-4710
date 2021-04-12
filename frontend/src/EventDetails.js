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
    // create a new Date object with the new value.
    else if(change.target.name === "month")
    {
      const date = new Date(event.date);
      date.setMonth(change.target.value - 1);
      setUpdate({...update, ["date"]: date});
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
              defaultValue={new Date(event.date).getMonth() + 1}
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
            {/*<input
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
            <input /* FIXME - Is there a way to always make this two digits?
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
            </select>*/}
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