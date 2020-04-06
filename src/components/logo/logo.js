import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import './logo.scss';

class Logo extends Component {
  render() {
    return (
      <div className="logoo">
        <img src={logo} alt="logo" className="logoo_logo" />
        <h2 className="logoo_heading">
          <span>Barefoot </span>
          Nomad
        </h2>
      </div>
    );
  }
}
export default Logo;
