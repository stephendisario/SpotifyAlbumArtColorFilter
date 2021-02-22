import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import {withRouter} from "react-router-dom"
import Login from "./Containers/Login/Login"
import Dashboard from "./Containers/Dashboard/Dashboard"
import TrackList from './Containers/TrackList/TrackList';

const App = () => {

  const [stateKey,setStateKey] = useState()

  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <Route path="/login">
            <Login stateKey={stateKey} setStateKey={setStateKey}/>
          </Route>
          <Route path="/dashboard">
            <Dashboard stateKey={stateKey}/>  
          </Route>      
          <Route path="/tracklist" render={(props) => <TrackList {...props}/>}/> 
        </Switch>   
      </Router>
  );
}

export default App;
