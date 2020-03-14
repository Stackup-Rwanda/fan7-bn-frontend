import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components';
import Error from '../components/error';
import Login from '../components/Authentication/Login';

export default function index() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="*" component={Error} />
    </Switch>
  );
}
