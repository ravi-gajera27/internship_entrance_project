import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';

function App() {
  return (
    <Switch>
      <Redirect from={'/'} to={'/login'} exact/>
      <Route path={'/login'} exact component={Login} />
      <Route path={'/signup'} exact component={Signup} />
    </Switch>
  );
}

export default App;
