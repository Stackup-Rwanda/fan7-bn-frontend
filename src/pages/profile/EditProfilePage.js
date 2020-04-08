import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/profile/EditProfileHeader';
import SideBar from '../../components/profile/EditProfileSideBar';
import ProfileForm from '../../components/profile/ProfileForm';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import profileActions from '../../store/modules/profile/actions';
import selectors from '../../store/modules/profile/selectors';
import './styles/editProfile.scss';
import Chatbot from '../../components/Chatbot';

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      image: null,
    };
    this.state = this.initialState;
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleImg = this.handleImg.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { getProfile } = profileActions;
    dispatch(getProfile());
  }

  handleUpdateProfile(data) {
    const { image } = this.state;

    if (data || image) {
      const { dispatch } = this.props;
      const { updateProfile } = profileActions;
      const dataToUpdate = !image ? data : { ...data, image };

      const formData = new FormData();

      Object.entries(dataToUpdate).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(updateProfile(formData));
    }
  }

  handleImg(image) {
    this.setState({
      image,
    });
  }

  render() {
    const { loading, updateLoading, profile, email, role, profileImg } = this.props;

    return loading ? (
      <Spinner />
    ) : (
      <div className="editProfile">
        {profile && (
          <>
            <Header />
            <SideBar
              email={email}
              role={role}
              profileImg={profileImg}
              handleChange={this.handleImg}
            />
            <ProfileForm
              profile={profile}
              loading={updateLoading}
              updateProfile={this.handleUpdateProfile}
            />
          </>
        )}
        <Chatbot />
      </div>
    );
  }
}

EditProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateLoading: PropTypes.bool.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
};

const {
  selectLoading,
  selectLoadingUpdateProfile,
  selectProfile,
  selectProfileEmail,
  selectProfileRole,
  selectProfileAvatar,
} = selectors;

const select = ({ userProfile }) => ({
  loading: selectLoading(userProfile),
  updateLoading: selectLoadingUpdateProfile(userProfile),
  profile: selectProfile(userProfile),
  email: selectProfileEmail(userProfile),
  role: selectProfileRole(userProfile),
  profileImg: selectProfileAvatar(userProfile),
});

export default connect(select)(DashboardLayout(EditProfilePage));
