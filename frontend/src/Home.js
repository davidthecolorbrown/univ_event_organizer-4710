import EventList from "./EventList";
import useFetch from "./useFetch";

const Home = () => {
  //const { error, isPending, data: events } = useFetch('http://localhost:3002/api/note')
  const { error, isPending, data: events } = useFetch('http://localhost:3002/api/event')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { events && <EventList events={events} /> }
    </div>
  );
}
 
export default Home;
