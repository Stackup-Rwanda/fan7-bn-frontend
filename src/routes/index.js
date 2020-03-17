import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components';
import Error from '../components/error';
import Login from '../pages/auth/Login';

export default function index() {
  return (
    <Switch>
      <Route path="/dashboard" exact component={Home} />
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="*" component={Error} />
    </Switch>
  );
}
