import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import DisplayUsers from './DisplayUsers';
import UserActions from '../../store/modules/role/actions';
import DashboardLayout from '../DashboardLayout/index';
import Pagination from '../Pagination/index';
import Spinner from '../Spinner/index';
import '../../assets/scss/style.scss';
import Dropdown from './Dropdown';
import Chatbot from '../../components/Chatbot';

class userRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showDropdown: false,
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: ""
    };
    
    this.handleDropdown = this.handleDropdown.bind(this);
    this.updateRole = this.updateRole.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { fetchUsers } = UserActions;
    dispatch(fetchUsers());
  }

  updateRole(role) {
    const { email, showDropdown } = this.state;
    const { dispatch } = this.props;
    const { updateUserRole } = UserActions;
    this.setState(() => ({
      showDropdown: !showDropdown,
    }));
    dispatch(updateUserRole({ email, role }));
  }

  handleDropdown(email) {
    const { showDropdown } = this.state;
    this.setState({
        showDropdown: !showDropdown,
        email,
    });
  }

  // handleSearch(e) {
  //   const { users } = this.props;
  //   this.props.users = _.find(users, { email: e.target.value });
  // }

  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  showUsers = (users) => {
    const sortedUsers = users.sort((a, b) => {
      if (a.email < b.email) return -1;
      if (a.email > b.email) return 1;
      return 0;
    });
    return sortedUsers ? sortedUsers.map((user) => (
      <DisplayUsers users={user} handleDropdown={this.handleDropdown} />
    )) : <p>No data found</p>
  }

  
  render() {
    const {
      pageLimit,
      startIndex,
      endIndex
    } = this.state;

    let rowsPerPage = [];

    rowsPerPage = this.props.users.slice(startIndex, endIndex + 1);

    const { users, loading } = this.props;
    const { showDropdown } = this.state;
    return loading
      ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="body_display">
          <div className="body_display_search">
            {/* <p>Search</p> */}
          </div>

          <table className="body_display_table">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Name</th>
                <th>Country</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {this.showUsers(rowsPerPage)}
            </tbody>
          </table>
          <div>
            {showDropdown && <Dropdown updateRole={this.updateRole} />}
          </div>
          <div className="body_display_pagination">
              <Pagination 
                totalRecords={users.length}
                pageLimit={pageLimit || 5}
                initialPage={1}
                pagesToShow={5}
                onChangePage={this.onChangePage}
              />
          </div>
          <Chatbot />
        </div>
      );
  }
}

userRole.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = ({ role }) => ({
  users: role.users,
  loading: role.loading,
});

export default connect(mapStateToProps)(DashboardLayout(userRole));
