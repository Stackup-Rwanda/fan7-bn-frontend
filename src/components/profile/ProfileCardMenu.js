import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/profileCardMenu.scss';

class ProfileCardMenu extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 'activityFeeds',
    };
    this.toggleActiveClass = this.toggleActiveClass.bind(this);
  }

  toggleActiveClass(event) {
    const { handleNavigation } = this.props;
    event.persist();
    this.setState(() => ({
      isActive: event.target.name,
    }));
    handleNavigation(event.target.name);
  }

  render() {
    const { isActive } = this.state;

    return (
      <>
        <button
          type="button"
          className={isActive === 'activityFeeds' ? 'menu active' : 'menu'}
          name="activityFeeds"
          onClick={this.toggleActiveClass}
        >
          Activity Feeds
        </button>
        <button
          type="button"
          className={isActive === 'trips' ? 'menu active' : 'menu'}
          name="trips"
          onClick={this.toggleActiveClass}
        >
          Trips
        </button>
      </>
    );
  }
}

ProfileCardMenu.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
};

export default ProfileCardMenu;
