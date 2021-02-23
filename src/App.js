import React from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import Login from "./Containers/Login/Login"
import DashboardRouter from "./Containers/Dashboard/DashboardRouter"

const App = () => {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/dashboard">
            <DashboardRouter/>  
          </Route>      
        </Switch>   
      </Router>

    </>
  );
}

export default App;
