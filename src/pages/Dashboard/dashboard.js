import React, { Component } from 'react';

export default class Dashboard extends Component {
  componentDidMount() {
    window.history.replaceState(null, null, `${window.location.origin}/dashboard`);
  }

  render() {
    return (
      <div>
        <h1>THIS IS THE DASHBOARD PAGE</h1>
      </div>
    );
  }
}
