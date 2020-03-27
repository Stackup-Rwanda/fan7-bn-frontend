import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Error from '../components/error';
import Error403 from '../pages/errors/Error403';
import Error404 from '../pages/errors/Error404';
import Error500 from '../pages/errors/Error500';

export default function index() {
  return (
    <Switch>
      <Route path="/403" exact component={Error403} />
      <Route path="/404" exact component={Error404} />
      <Route path="/500" exact component={Error500} />
      {/* <Route path="*" component={Error} /> */}
    </Switch>
  );
}
