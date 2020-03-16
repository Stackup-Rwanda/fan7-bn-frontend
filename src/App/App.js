import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import history from '../utils/helpers/history';
import Routes from '../routes';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}
export default App;
