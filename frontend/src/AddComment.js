import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// AddComment - A page that allows the creation of new comments.
const AddComment = () => {
  // Define the fields.
  const {id: event_id} = useParams();

  // Get UID and isAdmin...
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [rating, setRating] = useState(3);

  // Get the history object.
  const history = useHistory();

  // Add a new event to the database.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set created_at to the current time.
    const created_at = new Date();

    // Define the comment.
    const comment = {event_id, title, body, rating, created_at};

    // Post the event as a JSON string.
    fetch('http://localhost:3002/api/event/' + event_id + '/comments', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    }).then(() => {
      // FIXME: Go back to the event page.
      history.push('/');
    })
  }

  // Return the page.
  // FIXME - Make some of this non-centered.
  return (
    <div className="add-comment">
      <h2>Add a comment</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label><br/>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br/>
        <label>Comment:</label><br/>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea><br/>
        <label>Rating:</label><br/>
        <input
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          type="number"
          min="1"
          max="5"
        /><br/>
        <button>Submit Event</button>
      </form>
    </div>
  );
}

export default AddComment;