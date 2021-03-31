import { useState } from "react";
import { useHistory } from "react-router-dom";

// Create - A page that allows the creation of new events.
const Create = () => {
  // Define the fields.
  // {event_id, location, event_name, description, isRSO, isPrivate, type, title, note, _id, time, date, created_at}
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('random');
  const history = useHistory();

  // Add a new event to the database.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set ID? (IDK what it is...)
    const _id = 0;

    // Set isRSO and isPrivate based on type value.
    const isRSO = (type == 1);
    const isPrivate = (type == 2);

    // Set the transitional values.
    const note = description;
    const title = name;
    const date = time;

    // Set created_at to the current time.
    const created_at = new Date();

    // Define the event.
    const event = {location, name, description, isRSO, isPrivate, type, title, note, _id, time, date, created_at};

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

  // 
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
        <label>Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="reference">reference</option>
          <option value="job">job</option>
          <option value="school">school</option>
          <option value="career">career</option>
          <option value="random">random</option>
          <option value="idea">idea</option>
          <option value="quote">quote</option>
        </select>
        <button>Add Note</button>
      </form>
    </div>
  );
}

export default Create;