import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Table from '../../components/Table';
import { getTripRequests, ApproveReject } from '../../store/modules/request/view/actions';
import {
  selectLoading,
  selectCount,
  selectRequests,
} from '../../store/modules/request/view/selectors';
import AuthService from '../../utils/AuthService';
import './Request.scss';
import DynamicDashboard from '../../components/DynamicDashboard/Dashboard';
import ServerSidePagination from '../../components/ServerPagination/ServerSidePagination';
import { requesterDashboard, managerDashboard } from '../../assets/sidebar';
import profileImg from '../../assets/images/icons8-user-30.png';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

class Request extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      requests: [],
    };

    this.state = this.initialState;
    this.handleApprove = this.handleApprove.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTripRequests(1, 5));
  }

  handleApprove(row) {
    const status = 'approve';
    const { dispatch } = this.props;
    dispatch(ApproveReject(row.id, status));
  }
  handleReject(row) {
    const status = 'reject';
    const { dispatch } = this.props;
    if(row.status === 'Rejected') {
      alert(`Request Already ${row.status}`)
    }
    dispatch(ApproveReject(row.id, status));
  }
  onChangePage(page, limit) {
    const { dispatch } = this.props;
    dispatch(getTripRequests(page, limit));
  }

  render() {
    const managerCols = [
      { header: 'Requester', name: 'requester' },
      { header: 'Trip Reason', name: 'reason' },
      { header: 'Destination(s)', name: 'destination' },
      { header: 'Travel Date', name: 'travel_date' },
      { header: 'Return Date', name: 'returnDate' },
      { header: 'Type', name: 'type' },
      { header: 'Status', name: 'status' },
    ];
    const requesterCols = [
      { header: 'Trip Reason', name: 'reason' },
      { header: 'Destination(s)', name: 'destination' },
      { header: 'Travel Date', name: 'travel_date' },
      { header: 'Return Date', name: 'returnDate' },
      { header: 'Passport Name', name: 'passportName' },
      { header: 'Passport Number', name: 'passportNumber' },
      { header: 'Type', name: 'type' },
      { header: 'Status', name: 'status' },
    ];
    const { loading, count, requests } = this.props;
    const token = AuthService.getToken();
    const { role } = !!token ? jwtDecode(token) : { role: '' };
    const board = role === 'requester' ? requesterDashboard : managerDashboard;
    const createBtn = role === 'requester' ?
      <div className="mainButton">
        <Button
          type="submit"
          className="btn buton"
          value=" + Create Trip Request"
        />
      </div>
      : <div className="emptyDiv"></div>;

    return (
      <div className="big-container">
        <div className="sub-container">
          {createBtn}
          <hr className="line"></hr>
          <div className="search">
          <label className="page-title">Records per page</label> 
          <div className="search-box">
          <label className="">Search:</label> 
          <InputField
          type="text"
          name="search"
          className="search-input"
          />
          </div>
          </div>
          <hr className="line"></hr>
          <DynamicDashboard
          properties={board}
          profile={profileImg}
          />
          <Table
            cols={(role === 'requester' && requesterCols) || (role === 'manager' && managerCols) || []}
            data={requests}
            loading={loading}
            actions={true}
            handleApprove={this.handleApprove}
            handleReject={this.handleReject}
          />
            {/* Pagination start*/}
            <ServerSidePagination
            handleChangePage={this.onChangePage}
            totalRows={count}
            />
            {/* Pagination end */}
          </div>
      </div>
    );
  }
}

Request.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  requests: PropTypes.arrayOf().isRequired,
};

const select = ({ viewRequests }) => ({
  loading: selectLoading(viewRequests),
  count: selectCount(viewRequests),
  requests: selectRequests(viewRequests),
});

export default connect(select)(Request);
