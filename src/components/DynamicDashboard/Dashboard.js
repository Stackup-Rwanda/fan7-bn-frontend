import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import DropdownMenu from '../DropdownMenu';
import Notification from '../../pages/Notification';
import './DynamicDashboard.scss';
import home from '../../assets/icons/icons8-home-24.png';
import forward from '../../assets/icons/icons8-forward-32.png';
import dashboard from '../../assets/icons/icons8-details-32 (1).png';
import account from '../../assets/icons/icons8-customer-26.png';
import signout from '../../assets/icons/icons8-exit-30.png';
import notification from '../../assets/icons/notification.png';
import { selectCount } from '../../store/modules/notification/selectors';
import { getNotifications } from '../../store/modules/notification/actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getNotifications())
  }

  render() {
    const { properties } = this.props;
    const { links } = properties;
    const side = !!links ? (
      links.map((menu) => (
        <li>
          <NavLink to={`/${menu.path}`} className="dynamic_sidebar_main_component1">
            <img src={menu.icon} alt={menu.name} className="dynamic_sidebar_main_component1_icon" />
            <p className="dynamic_sidebar_main_component1_text">{menu.name}</p>
            <img src={forward} alt="forward" className="dynamic_sidebar_main_component1_image" />
          </NavLink>
        </li>
      ))
    ) : (
      <li>
        <NavLink to="/404" className="dynamic_sidebar_main_component1">
          <img src={home} alt="error" className="dynamic_sidebar_main_component1_icon" />
          <p className="dynamic_sidebar_main_component1_text">404 Error</p>
          <img src={forward} alt="forward" className="dynamic_sidebar_main_component1_image" />
        </NavLink>
      </li>
    );
    return (
      <div>
        <div className="dynamic_sidebar">
          <div className="dynamic_sidebar_header">
            <img src={home} alt="home" className="dynamic_sidebar_header_img" />
            <h1 className="dynamic_sidebar_header_title">{properties.head}</h1>
          </div>
          <ul className="dynamic_sidebar_main">
            <li>
              <NavLink to="/dashboard" className="dynamic_sidebar_main_component1">
                <img
                  src={dashboard}
                  alt="dashboard"
                  className="dynamic_sidebar_main_component1_icon"
                />
                <p className="dynamic_sidebar_main_component1_text">Dashboard</p>
                <img
                  src={forward}
                  alt="forward"
                  className="dynamic_sidebar_main_component1_image"
                />
              </NavLink>
            </li>
            {side}
          </ul>
          <ul className="dynamic_sidebar_bottom">
            <li>
              <NavLink to="/profile" className="dynamic_sidebar_bottom_component">
                <img
                  src={account}
                  alt="account"
                  className="dynamic_sidebar_bottom_component_icon"
                />
                <p className="dynamic_sidebar_bottom_component_text">Account</p>
                <img
                  src={forward}
                  alt="forward"
                  className="dynamic_sidebar_bottom_component_image"
                />
              </NavLink>
            </li>
            <li>
              <Link to="/login" className="dynamic_sidebar_bottom_component">
                <img
                  src={signout}
                  alt="signout"
                  className="dynamic_sidebar_bottom_component_icon"
                />
                <p className="dynamic_sidebar_bottom_component_text">Signout</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dynamic_navbar">
          <ul className="dynamic_navbar_left_items">
            <li className="left_title">
              {properties.topLeftHeader.head} <span>{properties.topLeftHeader.description}</span>
            </li>
          </ul>
          <ul className="dynamic_navbar_items">
            <li className="dynamic_navbar_items_single">
              <DropdownMenu icon={notification} text={this.props.count}>
                <Notification />
              </DropdownMenu>
            </li>
            <li>
              <img
                src={this.props.profile}
                alt="profile"
                className="dynamic_navbar_items_single2"
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const select = ({ notifications }) => ({
  count: selectCount(notifications),
});

export default connect(select)(Dashboard);
