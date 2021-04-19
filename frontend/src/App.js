import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddComment from './AddComment';
import Create from './Create';
import EditComment from './EditComment';
import EventDetails from './EventDetails';
import EventView from './EventView';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';
import Register from './Register';
import RSOView from './RSOView';

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
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/comment/edit/:id">
              <EditComment/> 
            </Route>
            <Route path="/comment/:id">
              <AddComment/> 
            </Route>
            <Route path="/event/edit/:id">
              <EventDetails/> 
            </Route>
            <Route path="/event/:id">
              <EventView/> 
            </Route>
            <Route path="/rso/:id">
              <RSOView/> 
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
