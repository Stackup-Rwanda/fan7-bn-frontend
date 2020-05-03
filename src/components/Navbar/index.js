import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import DropdownMenu from '../DropdownMenu';
import Notification from '../../pages/Notification';
import './Navbar.scss';
import Logo from '../logo/logo';
import defaultProfileImg from '../../assets/images/icons8-user-30.png';
import notification from '../../assets/icons/notification.png';
import { selectCount } from '../../store/modules/notification/selectors';
import selectors from '../../store/modules/profile/selectors';
import profileActions from '../../store/modules/profile/actions';
import { getNotifications } from '../../store/modules/notification/actions';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getProfile } = profileActions;
    this.props.dispatch(getNotifications());
    this.props.dispatch(getProfile());
  }

  render() {
    return (
        <div className="home-navbar">
          <ul className="home-navbar__left-items">
            <li className="home-navbar__left-items__title">
              <Logo />
            </li>
          </ul>
          <ul className="home-navbar__items">
            <li className="home-navbar__items__single">
              <DropdownMenu icon={notification} text={this.props.count}>
                <Notification />
              </DropdownMenu>
            </li>
            <li>
              <img
                src={this.props.profileImg || defaultProfileImg}
                alt="profile"
                className="home-navbar__items__single2"
              />
            </li>
          </ul>
        </div>
    );
  }
}

const { selectProfileAvatar } = selectors;

const select = ({ notifications, userProfile }) => ({
  count: selectCount(notifications),
  profileImg: selectProfileAvatar(userProfile),
});

export default connect(select)(Navbar);
