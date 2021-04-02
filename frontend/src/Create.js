import { useState } from "react";
import { useHistory } from "react-router-dom";

// Create - A page that allows the creation of new events.
const Create = () => {
  // Define the fields.
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [time, setTime] = useState(0);
  const [type, setType] = useState('public');
  const history = useHistory();

  // Type constants.
  const publicType = 0;
  const privateType = 1;
  const rsoType = 2;

  // Add a new event to the database.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set isRSO and isPrivate based on type value.
    const isPrivate = (type === privateType);
    const isRSO = (type === rsoType);

    // Set the transitional values.
    const note = description;
    const title = name;
    const date = time;

    // Set created_at to the current time.
    const created_at = new Date();

    // Define the event.
    const event = {location, name, description, isRSO, isPrivate, type, title, note, time, date, created_at};

    // Post the event as a JSON string.
    fetch('http://localhost:3002/api/note', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event)
    }).then(() => {
      //
      history.push('/');
    })
  }

  // Return the page.
  return (
    <div className="create">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <label>Location:</label>
        <input 
          type="text" 
          required 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Visibility:</label>
        <div>
          <input type="radio" value="public" checked={type === 0} onChange={(e) => setType(publicType)} /> Everyone
          <input type="radio" value="private" checked={type === 1} onChange={(e) => setType(privateType)} /> Students only
          <input type="radio" value="rso" checked={type === 2} onChange={(e) => setType(rsoType)} /> RSO members only
        </div>
        <button>Add Note</button>
      </form>
    </div>
  );
}

export default Create;