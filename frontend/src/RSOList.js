import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

// RSOList - a list of RSOs.
const RSOList = ({}) => {
  // Establish variables.
  const [input, setInput] = useState('');
  const [rsoUpdated, setRsoUpdated] = useState(false);

  // RSO list.
  const { error, isPending, data: rsos } = useFetch("http://localhost:3002/api/rso");  
  
  // Create the event list.
  return (
    <div className="event-list">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { rsos && rsoUpdated && (<div>
          {rsos.map(rso => (
            <div className="rso-preview" key={rso._id} >
              <Link to={`/rso/${rso.rso_id}`}>
                <h2>{ rso.name }</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Link to="/rso/create">Start an RSO</Link>
    </div>
  );
}
 
// Export the function.
export default RSOList;