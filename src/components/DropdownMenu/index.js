import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DropdownMenu.scss';
import notificationIcon from '../../assets/icons/notification.png';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  // componentWillMount() {
  //   window.addEventListener('click', function (e) {
  //     this.setState({ isOpen: false });
  //   });
  // }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children, icon, text } = this.props;

    if (children.length === 0) {
      throw 'DropdownMenu must have at least one MenuItem child.';
    }

    return (
      <div className="dropdown-menu">
        <button type="button" className="dropdown-menu__button" onClick={this.toggleMenu}>
          {icon && <img src={icon} className="dropdown-menu__icon" />}
          {text ? (
            <span className="dropdown-menu__text">{text}</span>
          ) : (
            <span className="dropdown-menu__text">0</span>
          )}
        </button>
        <div
          className={this.state.isOpen ? 'dropdown-menu__content show' : 'dropdown-menu__content'}
        >
          {children}
        </div>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DropdownMenu.defaultProps = {
  icon: notificationIcon,
  text: '',
};

export default DropdownMenu;
