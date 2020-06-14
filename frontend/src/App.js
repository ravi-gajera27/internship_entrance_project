import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';
import Contact from './containers/contact/contact';

function App() {
  return (
    <Switch>
      <Redirect from={'/'} to={'/login'} exact/>
      <Route path={'/contact'}  component={Contact} />
      <Route path={'/login'} exact component={Login} />
      <Route path={'/signup'}  component={Signup} />
    </Switch>
  );
}

export default App;
