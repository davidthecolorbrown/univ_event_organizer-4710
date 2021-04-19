import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Cookies from 'universal-cookie';

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

  // Check whether users can make comments and block if they can't.
  const cookies = new Cookies();
  const uid = cookies.get("user");
  const canMakeComment = uid !== undefined

  // Add a new event to the database.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set created_at to the current time.
    const created_at = new Date();

    // Get the user ID.
    const uid = cookies.get("user");

    // Define the comment.
    const comment = {uid, event_id, title, body, rating, created_at};

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
      {canMakeComment && (
        <div>
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
      )}
      {!canMakeComment && (
        <div>
          <h2>Sorry!</h2>
          You need to <Link to="/Login">log in</Link> to post a comment.
        </div>
      )}
    </div>
  );
}

export default AddComment;