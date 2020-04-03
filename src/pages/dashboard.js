import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  componentDidMount() {
    window.history.replaceState(null, null, `${window.location.origin}/dashboard`);
  }

  render() {
    return (
      <>
        <h1>
          Welcome to your Dashboard
        </h1>
      </>
    );
  }
}
const mapState = ({ social }) => ({
  isAuthenticated: social.isAuthenticated,
  user: social.user,
});
export default connect(mapState)(Dashboard);
