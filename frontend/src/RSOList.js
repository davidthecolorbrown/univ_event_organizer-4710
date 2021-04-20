import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

// RSOList - a list of RSOs.
const RSOList = ({}) => {
  // Establish variables.
  const [input, setInput] = useState('');
  const [rsoList, setRSOList] = useState([]);

  // RSO list and cookies.
  const { error, isPending, data: rsos } = useFetch("http://localhost:3002/api/rso");
  const cookies = new Cookies();
  
  // set the css styling for search bar
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  
  // Create the event list.
  return (
    <div className="event-list">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { rsos && (
        <div>
          {rsos.map(rso => (
            <div className="rso-preview" key={rso._id} >
              <Link to={`/rso/${rso.rso_id}`}>
                <h2>{ rso.name }</h2>
              </Link><br/>
            </div>
          ))}
        </div>
      )}
      {cookies.get('user') !== undefined && (
        <div>
          <Link to="/rso/create">Start an RSO</Link>
        </div>
      )}
    </div>
  );
}
 
// Export the function.
export default RSOList;