//

//
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//
const BlogList = ({blogs, keyword}) => {

  // 
  const [input, setInput] = useState('');
  const [noteList, setNoteList] = useState(blogs);

  // update search bar input
  const updateSearch = async (input) => {
    //  
    const filteredByType = blogs.filter(blog => {
      //
      return blog.type.toLowerCase().includes(input.toLowerCase())
    })
      
    console.log("input: " + input);
    console.log("filteredByType: " + filteredByType);
    
    //
    setInput(input);
    setNoteList(filteredByType);
  }

  // set the css styling for search bar
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  
  //
  return (
    <div className="blog-list">
      <input 
          style={BarStyling}
          key="random1"
          value={input}
          placeholder={"search notes by type"}
          onChange={(e) => updateSearch(e.target.value)}
      />
      {/* {blogs.map(blog => ( */}
      {noteList.map(blog => (
        <div className="blog-preview" key={blog._id} >
          {console.log(blog._id)}
          <Link to={`/note/${blog._id}`}>
            <h2>{ blog.title }</h2>
            <p>Date: { blog.date }</p>
            <p>Type: { blog.type }</p>
            <p>Note: { blog.note }</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
//
export default BlogList;