import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from 'react';

// EditComment - An editor for comments.
const EditComment = () => {
  
  // Get the event ID.
  const { id } = useParams();
  console.log("id: " + id);

  // Get comment data.
  // FIXME: Change fetch URL.
  const { data: comment, error, isPending } = useFetch('http://localhost:3002/api/event/' + id);
  
  // Get history.
  const history = useHistory();

  // Create an empty event to hold all updates.
  const [update, setUpdate] = useState({})

  // handleDelete - Handle the deletion of the event.
  const handleDelete = () => {
    // Summon a message for confirmation.
    var deleteComment = window.confirm("Are you sure you want to delete this comment?");

    console.log('User input: ' + deleteComment);

    // Only delete if user confirms they want to delete.
    if (deleteComment === true)
    {
        // FIXME: Change fetch URL.
      fetch('http://localhost:3002/api/event/' + comment._id,
            {method: 'DELETE'}).then(() => {history.push('/');}) 
    } 
  }

  // handleUpdate - Process an update.
  const handleUpdate = () => {
    console.log("handle update running!");
    console.log('/note/update/' + comment._id);

    // Stringify the update and PUT it to MongoDB.
    // FIXME: Change fetch URL.
    fetch('http://localhost:3002/api/event/' + comment._id, {
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

    // Create the update.
    setUpdate({...update, [change.target.name]: change.target.value});
    console.log("state changing");
  }

  // handleCancel - If the cancel button is pushed, go to the event page.
  const handleCancel = () => {
      history.push('/');
  }

  // Render the EditNote component.
  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { comment && (
        <article>
        <div className="edit">
          <h2>Editing your comment...</h2>
          <form onSubmit={handleUpdate}>
            <label>Title: </label>
            <input 
              name="title"
              type="text"
              required
              defaultValue={comment.type}
              onChange={handleChange}
            />
            <br/>
            <br/>
            <label>Body: </label>
            <textarea
                name="body"
                defaultValue={comment.body}
                onChange={handleChange}
            />
            <br/><br/>
            <label>Rating:</label><br/>
            <input
              value={comment.rating}
              onChange={handleChange}
              type="number"
              min="1"
              max="5"
            /><br/>
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
export default EditComment;