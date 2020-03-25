import React, { Component } from 'react';
import './styles/editProfileHeader.scss';

class EditProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isActive: 'profile',
    };
    this.state = this.initialState;
    this.toggleActiveClass = this.toggleActiveClass.bind(this);
  }

  toggleActiveClass(event) {
    this.setState({
      isActive: event.target.name,
    });
  }

  render() {
    const { isActive } = this.state;

    return (
      <div className="header">
        <h1 className="header__title">Settings</h1>
        <div className="header__menu">
          <button
            type="button"
            className={
              isActive === 'profile' ? 'header__menu___item active' : 'header__menu___item'
            }
            name="profile"
            onClick={this.toggleActiveClass}
          >
            Profile
          </button>
          <button
            type="button"
            className={
              isActive === 'notification' ? 'header__menu___item active' : 'header__menu___item'
            }
            name="notification"
            onClick={this.toggleActiveClass}
          >
            Notification
          </button>
        </div>
      </div>
    );
  }
}

export default EditProfileHeader;
