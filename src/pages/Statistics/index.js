import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import './style.scss'
import { getTripStatistics } from '../../store/modules/request/view/actions';
import {
  selectLoading,
  selectCount,
  selectRequests,
} from '../../store/modules/request/view/selectors';
import AuthService from '../../utils/AuthService';
import DynamicDashboard from '../../components/DynamicDashboard/Dashboard';
import { requesterDashboard, managerDashboard } from '../../assets/sidebar';
import profileImg from '../../assets/images/icons8-user-30.png';


class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      startDate: '',
      endDate: '',
    };

    this.tripsHandler = this.tripsHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  tripsHandler = async (event) => {
   event.preventDefault();
   const { startDate, endDate } = this.state
   console.log(this.state.trips);
    await this.props.StatsFetch({startDate, endDate});
  }


  render() {
    const token = AuthService.getToken();
    const { role } = !!token ? jwtDecode(token) : { role: '' };
    const board = role === 'requester' ? requesterDashboard : managerDashboard;

    return (
      <div className="big-container">
        <div className="sub-container">
            <div className="wrapper__stats"> 
            <div className="row">
                <div className="col1">
                    <p className="stat__title">Trip statistics</p>
                <div className="search__date">
                <form onSubmit={this.tripsHandler}>
                    <div className="form-control">
                        <label>From</label>
                        <input type="text" name="startDate" value={this.state.startDate} onChange={this.handleChange} className="input"/>
                    </div>
                    <div className="form-control">
                        <label>To</label>
                        <input type="text" name="endDate" value={this.state.endData} onChange={this.handleChange}  className="input"/>
                    </div>
                    <button className="btn trips__btn">Search</button>
                </form>
                </div>
                </div>
                <div className="col2">
                <p className="stat__title">Trips stats</p>
                <div className="trips__searched">
                {this.state.trips.length > 0 ? (
                  <h2><span>{this.state.trips}</span> trips found</h2>
                ) : (
                  <h2>No trips found</h2>
                )}
                  </div>
                </div>
            </div>
            </div>
          <DynamicDashboard
          properties={board}
          profile={profileImg}
          />
          </div>
      </div>
    );
  }
}

Request.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  console.log(state.viewRequests.trips);
  const { viewRequests } = state;
  return {
    trips: viewRequests
   }
}

const mapDispatchToProps = dispatch => ({
    StatsFetch: data => {
      dispatch(getTripStatistics(data));
    },
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Request);
