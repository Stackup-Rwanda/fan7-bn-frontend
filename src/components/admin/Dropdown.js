import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/scss/style.scss';
import more from '../../assets/icons/icons8-collaborator-male-24.png';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { updateRole } = this.props;
    updateRole(e.target.dataset.role);
  }

  render() {
    return (
      <div className="Dropdown">
        <div className="Dropdown_main">
          <div className="Dropdown_main_title">
            <h3>Change user role to :</h3>
          </div>
          <div>
            <ul className="Dropdown_main_body">
              <li className="Dropdown_main_body_element1" data-role="manager" onClick={this.handleClick}>
                <img src={more} alt="icon" />
                Manager
              </li>
              <li className="Dropdown_main_body_element2" data-role="host-supplier" onClick={this.handleClick}>
                <img src={more} alt="icon" />
                Host-supplier
              </li>
              <li className="Dropdown_main_body_element3" data-role="travel-administrator" onClick={this.handleClick}>
                <img src={more} alt="icon" />
                Travel Admin
              </li>
              <li className="Dropdown_main_body_element4" data-role="requester" onClick={this.handleClick}>
                <img src={more} alt="icon" />
                Requester
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  updateRole: PropTypes.func.isRequired,
};

export default Dropdown;
