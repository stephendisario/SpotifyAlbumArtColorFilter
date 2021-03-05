import React, { createContext, useState } from 'react';
import {Switch,Route} from "react-router-dom";
import Home from "./Home/Home"
import TrackList from './Home/TrackList/TrackList';
import Navbar from "./Navbar/Navbar"
import getHashParams from "../../util/getHashParams"
import Collage from "./Collage/Collage"

const DashboardRouter = () => {
  //this access token is needed in every axios call and obtainable by all children via useContext
  const accessToken = getHashParams().access_token

  return (
    <>
      <AccessTokenContext.Provider value={accessToken}>
        <Navbar/>
        <Switch>
          <Route exact path="/dashboard" component={Home}/>
          <Route path="/dashboard/home">
            <Home accessToken={accessToken}/>
          </Route>        
          <Route path="/dashboard/collage" component={Collage}/>
          <Route path="/dashboard/tracklist" render={(props) => <TrackList {...props}/>}/> 
        </Switch>  
      </AccessTokenContext.Provider>
    </> 
  );
}

export const AccessTokenContext = createContext()

export default DashboardRouter;
