//
import { useState } from "react";
import { useHistory } from "react-router-dom";

//
const Create = () => {
  //
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('random');
  const history = useHistory();

  //
  const handleSubmit = (e) => {
    e.preventDefault();

    //
    const blog = { title, note, type };

    //
    fetch('http://localhost:3002/api/note', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      //
      history.push('/');
    })
  }

  // 
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <label>Blog type:</label>
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

// 
export default Create;