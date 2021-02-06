import React, { FC, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";
import Auth from "../components/Auth";
import Home from "../components/Home";

import NavBar from "../components/NavBar";
import LogOut from '../components/logOut';
import DiaryEntriesList from '../components/DiaryEntriesList'


const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div style={{ marginBottom: "3rem" }}>
      
      
      <Router>
        <Switch><Route exact path="/">
        {isLoggedIn ? <Redirect to="/home" /> : <Auth />}
      </Route>

      <Route path="/home">
        <NavBar />
        {!isLoggedIn? <Redirect to="/" /> : <Home />}
      </Route>

          
        <Route  path="/login " component={Auth}>  </Route>
         
          <Route path="/logout" component={LogOut}></Route>
         
          <Route path="/diary/:id" >
              <DiaryEntriesList/>
        </Route> 

        </Switch>
      </Router>
    </div>
  );
};

export default App;
