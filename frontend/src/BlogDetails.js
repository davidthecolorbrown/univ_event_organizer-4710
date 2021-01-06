import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from 'react';

//
const BlogDetails = () => {
  //
  const { id } = useParams();
  console.log("id: " + id);

  //
  const { data: blog, error, isPending } = useFetch('http://localhost:3002/api/note/' + id);
  
  //
  const history = useHistory();

  //
  const [note, setNote] = useState({})

  //
  const handleDelete = () => {
    //
    var deleteNote = window.confirm("Are you sure you want to delete this note?");

    console.log('User input: ' + deleteNote);

    // only delete if user confirms they want to delete todo
    if (deleteNote === true) {
      fetch('http://localhost:3002/api/note/' + blog._id, {
        method: 'DELETE'
      }).then(() => {
        history.push('/');
      }) 
      } 
  }

  //
  const handleUpdate = () => {
    console.log("handle update running!");
    console.log('/note/update/' + blog._id);

    fetch('http://localhost:3002/api/note/' + blog._id, {
      method: 'PUT',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note)
    }).then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    });
    history.push('/');
    console.log('handleUpdate!');
    console.log(note);
  }

  //
  function handleChange(event) {
    setNote({...note, [event.target.name]: event.target.value})
    console.log("state changing");
    
  }

  // if cancel button is pushed, go to homepage
  const handleCancel = () => {
      history.push('/');
  }

  // render state of EditNote component
  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
        <div className="create">
          <h2>{ blog.title }</h2>

          <form onSubmit={handleUpdate}>
          <label>Title: </label>
          <br></br>
          <textarea name="title" defaultValue={blog.title} onChange={handleChange} />
          <br></br><br></br>
          <label>Type: </label>
          <br></br>
          <textarea name="type" defaultValue={blog.type} onChange={handleChange} />
          <br></br><br></br>
          <label>Note: </label>
          <br></br>
          <textarea name="note" defaultValue={blog.note} onChange={handleChange} />
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
 
//
export default BlogDetails;