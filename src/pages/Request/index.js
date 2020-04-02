import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import DashboardLayout from '../../components/DashboardLayout';
import Table from '../../components/Table';
import Pagination from '../../components/request/Pagination';
import { getTripRequests } from '../../store/modules/request/view/actions';
import {
  selectLoading,
  selectCount,
  selectRequests,
} from '../../store/modules/request/view/selectors';
import AuthService from '../../utils/AuthService';
import './Request.scss';

class Request extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      requests: [],
    };

    this.state = this.initialState;
    this.handleAction = this.handleAction.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTripRequests());
  }

  handleAction(row) {
    console.log(row);
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

    return (
      <div className="request-page">
        <Table
          cols={(role === 'requester' && requesterCols) || (role === 'manager' && managerCols) || []}
          data={requests}
          loading={loading}
          actions={true}
          handleAction={this.handleAction}
        />
        <Pagination
          total={count}
          // page={page}
          // rowsPerPage={rowsPerPage}
          // numberOfRows={numberOfRows}
          // updateRows={this.updateRows}
          // onChangePage={this.handleChangePage}
          // onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
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

export default connect(select)(DashboardLayout(Request));
