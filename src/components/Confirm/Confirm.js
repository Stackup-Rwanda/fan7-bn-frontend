import React, { Component } from 'react';
import Button from '../Button';
import { render } from 'react-dom';

let resolve;
const defaultProps = {
  action: 'Ok',
  message: 'Are you sure?',
};

class Confirm extends Component {
  static create(props = {}) {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    console.log(props);
    return render(<Confirm createConfirmProps={props} />, containerElement);
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  show(props = {}) {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { message, action, ...rest } = showConfirmProps;
    return (
      <div className={!isOpen ? 'confirm_modal' : 'confirm_modal_is-active'}>
        <div class="confirm_modal_content">
          <div className="confirm_modal_cancel_cross">
            <span
              className="delete"
              aria-label="close"
              onClick={this.handleCancel}
            >
              X
            </span>
          </div>
          <div class="confirm_modal_content_row">
            <div class="confirm_modal_content_row_text">
              <label for="type">{message || defaultProps.message}</label>
            </div>
          </div>
          <div class="confirm_modal_content_row_option">
            <div className="confirm_btn_approve">
              <Button
                className={
                  action === ('reject' || 'delete')
                    ? 'btn confirm_btn_reject_btn'
                    : 'btn confirm_btn_approve_btn'
                }
                onClick={this.handleConfirm}
                value={action}
              />
            </div>
            <div className="confirm_btn_cancel">
              <Button
                className="btn confirm_btn_cancel_btn"
                onClick={this.handleCancel}
                value="cancel"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
