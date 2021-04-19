import EventList from "./EventList";
import useFetch from "./useFetch";
import Cookies from 'universal-cookie';

const Home = () => {
  // Get the cookies and see what events should be hidden.
  const cookies = new Cookies();
  var apiString = "";

  if(cookies.get('user') !== undefined)
    apiString = 'http://localhost:3002/api/event/student';
  else
    apiString = 'http://localhost:3002/api/event'
  
  const { error, isPending, data: events } = useFetch(apiString);

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { events && <EventList events={events} /> }
    </div>
  );
}
 
export default Home;
