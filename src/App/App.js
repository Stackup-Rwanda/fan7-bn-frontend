import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from '../utils/helpers/history';
import Routes from '../routes';
import '../assets/scss/react-toastify/scss/main.scss';

class App extends Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Routes />
        </Router>
        <ToastContainer />
      </>
    );
  }
}
export default App;
