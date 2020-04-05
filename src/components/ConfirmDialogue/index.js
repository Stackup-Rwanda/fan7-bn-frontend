import React, { Component } from 'react';
import confirmService from '../Confirm';
import './style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['First request', 'tripping request', 'Go to bathroom'],
    };
    this.removeItem = this.removeItem.bind(this);
  }

  async removeItem({ target: { value, name } }) {
    const result = await confirmService.show({
      action: name,
      message: `Are you sure you want to ${name} this request?`,
    });
    if (result) {
      const items = this.state.items.filter(
        (item, index) => index !== parseInt(value)
      );
      this.setState({ items });
    }
  }

  render() {
    const { items } = this.state;
    return (
      <div className="Manager_container">
        <h1 className="Manager_container_title">BAREFOOT NOMAD WE OUT HERE</h1>
        <p>All managers requests</p>
        <div className="Manager_Item_container">
          {items.map((item, index) => (
            <div className="Manager_container_Item" key={item}>
              <div className="Manager_container_Item_row_content">
                <p className="title">{item}</p>
              </div>
              <div className="Manager_container_Item_row_button is-danger">
                <button
                  className="Manager_container_Item_row_button_button is-danger"
                  name="approve"
                  value={index}
                  onClick={this.removeItem}
                >
                  Approve
                </button>
                <button
                  className="Manager_container_Item_row_button_button is-danger"
                  name="reject"
                  value={index}
                  onClick={this.removeItem}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
