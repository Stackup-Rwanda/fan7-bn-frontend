import { createSelector } from 'reselect';

const selectRaw = (userProfile) => userProfile;

const selectProfile = createSelector(
  [selectRaw],
  (userProfile) => (userProfile ? userProfile.profile : null),
);

const selectProfileFullName = createSelector(
  [selectProfile],
  (profile) => (profile && (profile.first_name || profile.last_name)
    ? `${profile.first_name} ${profile.last_name}`
    : 'Provide your names'),
);

const selectProfileUserName = createSelector([selectProfile], (profile) => (profile ? profile.user_name : ''));

const selectProfileEmail = createSelector([selectProfile], (profile) => (profile ? profile.email : ''));

const selectProfileRole = createSelector([selectProfile], (profile) => (profile ? profile.role : ''));

const selectProfilePhone = createSelector([selectProfile], (profile) => (profile ? profile.phone : ''));

const selectProfileAddress = createSelector([selectProfile], (profile) => (profile ? profile.address : ''));

const selectProfileGender = createSelector([selectProfile], (profile) => (profile ? profile.gender : ''));

const selectProfileDob = createSelector([selectProfile], (profile) => (profile ? profile.dob : ''));

const selectProfileCountry = createSelector([selectProfile], (profile) => (profile ? profile.country : ''));

const selectProfilePreferedLanguage = createSelector([selectProfile], (profile) => (profile ? profile.prefered_language : ''));

const selectProfilePreferedCurrency = createSelector([selectProfile], (profile) => (profile ? profile.prefered_currency : ''));

const selectProfileCompany = createSelector([selectProfile], (profile) => (profile ? profile.company : ''));

const selectProfileDepartment = createSelector([selectProfile], (profile) => (profile ? profile.department : ''));

const selectProfileAvatar = createSelector([selectProfile], (profile) => (profile ? profile.image_url : ''));

const selectLoading = createSelector(
  [selectRaw],
  (userProfile) => (userProfile ? !!userProfile.loading : false),
);

const selectLoadingUpdateProfile = createSelector(
  [selectRaw],
  (userProfile) => (userProfile ? !!userProfile.loadingUpdateProfile : false),
);

const selectErrorMessage = createSelector([selectRaw], ({ error }) => error);

export default {
  selectRaw,
  selectProfile,
  selectProfileFullName,
  selectProfileUserName,
  selectProfileEmail,
  selectProfileRole,
  selectProfilePhone,
  selectProfileAddress,
  selectProfileGender,
  selectProfileDob,
  selectProfileCountry,
  selectProfilePreferedLanguage,
  selectProfilePreferedCurrency,
  selectProfileCompany,
  selectProfileDepartment,
  selectProfileAvatar,
  selectLoadingUpdateProfile,
  selectLoading,
  selectErrorMessage,
};
