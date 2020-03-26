import React, { Component } from 'react';
import more from '../../assets/icons/icons8-menu-vertical-30.png';


class DisplayUsers extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(e) {
        const { handleDropdown } = this.props;
        handleDropdown(e.target.dataset.email);
      }
        
    render() {
    const { users } = this.props;

        return (
                <tr>
                <td>{users.email}</td>
                <td>{users.first_name}</td>
                <td>{users.last_name}</td>
                <td>{users.user_name}</td>
                <td>{users.country}</td>
                <td>{users.role}</td>
                <td>
                  <button type="button" className="more">
                    <img
                      src={more}
                      alt="morev"
                      data-email={users.email}
                      onClick={this.handleClick}
                    />
                  </button>
                </td>
              </tr>
        )
    }
}
export default DisplayUsers;