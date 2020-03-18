import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../components/profile/ProfileCard';
import ProfileFeeds from '../../components/profile/ProfileFeeds';
import ProfileTrips from '../../components/profile/ProfileTrips';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import profileActions from '../../store/modules/profile/actions';
import selectors from '../../store/modules/profile/selectors';
import './styles/profile.scss';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'activityFeeds',
    };

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { getProfile, getTrips } = profileActions;
    dispatch(getProfile());
    dispatch(getTrips());
  }

  handleNavigation(value) {
    this.setState({ show: value });
  }

  render() {
    const { show } = this.state;
    const {
      fullName, userName, gender, dob, address, profileImg, trips, loading,
    } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <div className="profile">
        <div className="profile-hero">
          <h1 className="profile-hero__title">Travel The World</h1>
        </div>
        <div className="profile-card">
          <Card
            fullName={fullName}
            userName={userName}
            profileImg={profileImg}
            handleNavigation={this.handleNavigation}
          />
        </div>
        <div className="profile-content">
          {show === 'activityFeeds' && <ProfileFeeds gender={gender} dob={dob} address={address} />}
          {show === 'trips' && <ProfileTrips trips={trips} />}
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  fullName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
  trips: PropTypes.arrayOf().isRequired,
};

const {
  selectLoading,
  selectProfileFullName,
  selectProfileUserName,
  selectProfileGender,
  selectProfileDob,
  selectProfileAddress,
  selectProfileAvatar,
  selectProfileRole,
} = selectors;

const select = ({ userProfile }) => ({
  loading: selectLoading(userProfile),
  fullName: selectProfileFullName(userProfile),
  userName: selectProfileUserName(userProfile),
  gender: selectProfileGender(userProfile),
  dob: selectProfileDob(userProfile),
  address: selectProfileAddress(userProfile),
  profileImg: selectProfileAvatar(userProfile),
  role: selectProfileRole(userProfile),
  trips: userProfile ? userProfile.trips : null,
});

export default connect(select)(DashboardLayout(ProfilePage));
