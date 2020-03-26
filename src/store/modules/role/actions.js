import axios from 'axios';
import swal from 'sweetalert';
import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  CHANGE_USER_ROLE_START,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_FAILURE,
  SEARCH_USER,
} from './actionTypes';

const fetchUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS_START });
  const token = localStorage.getItem('barefoot_nomad_token');
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  axios.get('https://barefoot-nomad-staging.herokuapp.com/api/users', config)
    .then((res) => {
      dispatch({ type: GET_USERS_SUCCESS, users: res.data.data });
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_FAILURE, error });
    });
};

const updateUserRole = (data) => (dispatch) => {
  dispatch({ type: CHANGE_USER_ROLE_START });
  const token = localStorage.getItem('barefoot_nomad_token');
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  axios.patch('https://barefoot-nomad-staging.herokuapp.com/api/auth/assignRole', data, config)
    .then((res) => {
      dispatch({ type: CHANGE_USER_ROLE_SUCCESS });
      window.location.href = '/userrole';
      swal({
        title: 'User Updated Successfully ',
        text: `${res.data.message}`,
        icon: 'success',
        timer: 10000,
        buttons: false,
      });
    })
    .catch((error) => {
      dispatch({ type: CHANGE_USER_ROLE_FAILURE, error });
    });
};

const searchUser = () => (dispatch) => {
  dispatch({ type: SEARCH_USER });
};

export default {
  fetchUsers,
  updateUserRole,
  searchUser,
};
