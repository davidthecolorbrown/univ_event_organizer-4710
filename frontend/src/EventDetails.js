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
  function handleChange(change) {
    setUpdate({...update, [change.target.name]: change.target.value})
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
          <textarea name="event_name" defaultValue={event.event_name} onChange={handleChange} />
          <br></br>
          <label>Location: </label>
          <textarea name="location" defaultValue={event.location} onChange={handleChange} />
          <br></br>
          {/* FIXME: Add date/time setting here
          <label>Type: </label>
          FIXME: Switch to radio button like in Create.js
          <textarea name="type" defaultValue={event.type} onChange={handleChange} />
          <br></br><br></br>*/}
          <label>Description: </label>
          <textarea name="description" defaultValue={event.description} onChange={handleChange} />
          <br></br>
          <br></br>
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