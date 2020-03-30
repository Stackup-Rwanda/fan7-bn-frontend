import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboardLayout.scss';
import home from '../../assets/icons/icons8-home-24.png';
import forward from '../../assets/icons/icons8-forward-32.png';
import dashboard from '../../assets/icons/icons8-details-32 (1).png';
import user from '../../assets/icons/icons8-user-group-30.png';
import trip from '../../assets/icons/icons8-trekking-26.png';
import accomodations from '../../assets/icons/icons8-hotel-check-in-30.png';
import account from '../../assets/icons/icons8-customer-26.png';
import signout from '../../assets/icons/icons8-exit-30.png';
import notification from '../../assets/icons/notification.png';
import profile from '../../assets/icons/icons8-customer-48.png';

const DashboardLayout = (ContentComponent) => class extends Component {
  render() {
    const { role, profileImg } = this.props;
    return (
      <div>
        <div className="sidebar">
          <div className="sidebar_header">
            <img src={home} alt="home" className="sidebar_header_img" />
            <h1 className="sidebar_header_title">{role}</h1>
          </div>

          <ul className="sidebar_main">
            <li>
              <Link to="/dashboard" className="sidebar_main_component1">
                <img src={dashboard} alt="dashboard" className="sidebar_main_component1_icon" />
                <p className="sidebar_main_component1_text">Dashboard</p>
                <img src={forward} alt="forward" className="sidebar_main_component1_image" />
              </Link>
            </li>
            <li>
              <Link to="/userrole" className="sidebar_main_component1">
                <img src={user} alt="users" className="sidebar_main_component1_icon" />
                <p className="sidebar_main_component1_text">Users</p>
                <img src={forward} alt="forward" className="sidebar_main_component1_image" />
              </Link>
            </li>
            <li>
              <Link to="/request" className="sidebar_main_component1">
                <img src={trip} alt="trip-requests" className="sidebar_main_component1_icon" />
                <p className="sidebar_main_component1_text">Trip Requests</p>
                <img src={forward} alt="forward" className="sidebar_main_component1_image" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="sidebar_main_component1">
                <img
                  src={accomodations}
                  alt="accomodations"
                  className="sidebar_bottom_component1_icon"
                />
                <p className="sidebar_main_component1_text">Accomodations</p>
                <img src={forward} alt="forward" className="sidebar_main_component1_image" />
              </Link>
            </li>
          </ul>
          <ul className="sidebar_bottom">
            <li>
              <Link to="/profile" className="sidebar_bottom_component">
                <img src={account} alt="account" className="sidebar_bottom_component_icon" />
                <p className="sidebar_bottom_component_text">Account</p>
                <img src={forward} alt="forward" className="sidebar_bottom_component_image" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="sidebar_bottom_component">
                <img src={signout} alt="signout" className="sidebar_bottom_component_icon" />
                <p className="sidebar_bottom_component_text">Signout</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar">
          <ul className="navbar_items">
            <li>
              <img src={notification} alt="notifications" className="navbar_items_single" />
            </li>
            <li>
              <img src={profileImg || profile} alt="profile" className="navbar_items_single2" />
            </li>
          </ul>
        </div>

        <div className="body">
          <ContentComponent {...this.props} />
        </div>
      </div>
    );
  }
};
export default DashboardLayout;
