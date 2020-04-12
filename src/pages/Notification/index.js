import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectNotifications, selectLoading } from '../../store/modules/notification/selectors';
import history from '../../utils/helpers/history';
import {
  getNotifications,
  markOneAsRead,
  markAllAsRead,
} from '../../store/modules/notification/actions';
import settingsIcon from '../../assets/icons/settings-24px.svg';
import closeIcon from '../../assets/icons/close-24px.svg';
import './Notification.scss';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.markAllAsRead = this.markAllAsRead.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  markAllAsRead() {
    const { dispatch } = this.props;
    dispatch(markAllAsRead());
    dispatch(getNotifications());
  }

  handleRedirect(notificationId, requestId) {
    const { dispatch } = this.props;
    dispatch(markOneAsRead(notificationId));
    dispatch(getNotifications());
    history.push(`/requests/${requestId}`);
  }

  render() {
    const { notifications, loading } = this.props;

    return (
      <div className="notification">
        <div className="notification__header">
          <button type="button">
            <img src={settingsIcon} alt="settings" />
          </button>
          <span>Notifications</span>
        </div>
        <ul className="notification__list">
          {notifications.length > 0
            ? notifications.map((notification) => (
                <li key={notification.id} className="notification__item">
                  <h4 className="notification__item__title">{notification.type}</h4>
                  <a
                    className="notification__item__content"
                    // href="/request"
                    onClick={() => this.handleRedirect(notification.id, notification.request_id)}
                  >
                    {notification.message}
                  </a>
                </li>
              ))
            : null}
        </ul>
        <div className="notification__footer">
          {notifications.length > 0 ? (
            loading ? (
              <span>Marking all as read...</span>
            ) : (
              <button
                type="button"
                className="notification__footer__button"
                onClick={this.markAllAsRead}
              >
                Mark all as read
              </button>
            )
          ) : (
            <span>No unread notifications</span>
          )}
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notifications: PropTypes.arrayOf().isRequired,
};

const select = ({ notifications }) => ({
  notifications: selectNotifications(notifications),
  loading: selectLoading(notifications),
});

export default connect(select)(Notification);
