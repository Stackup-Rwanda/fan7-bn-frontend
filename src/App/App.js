import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import history from '../utils/helpers/history';
import AuthenticationRoutes from '../routes/Authenticantion';
import ErrorRoutes from '../routes/Errors';

class App extends Component {
  render() {
    return (
      <>
        <Router history={history}>
          <AuthenticationRoutes />
          <ErrorRoutes />
        </Router>
      </>
    );
  }
}
export default App;
