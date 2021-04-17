import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddComment from './AddComment';
import Create from './Create';
import EventDetails from './EventDetails';
import EventView from './EventView';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/comment/:id">
              <AddComment/> 
            </Route>
            <Route path="/note/:id">
              {/* Decide which is taken based on user permissions. */}
              {/* <EventDetails /> */}
              <EventView/> 
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
