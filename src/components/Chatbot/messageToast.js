import React, { Component } from 'react';
import './toast.scss';

class ToastMessage extends Component {
  constructor(props) {
    super(props);
    
    this.autoClose = this.autoClose.bind(this);
  }

  componentDidMount() {
    this.autoClose();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
      this.autoClose();
    }
  }

  autoClose() {
    const el = document.getElementsByClassName('toast_message')[0];
    el.style.display = "block"; 
    setTimeout(() => {
      el.style.display = "none";
    }, 3000);
  }

  render() {
    const { info } = this.props;
    return (
      <div className="toast_message">
          New message from {info.sender}
      </div>
    )
  }

}
export default ToastMessage;
