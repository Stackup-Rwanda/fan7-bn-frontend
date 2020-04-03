import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import './styles.scss';

class RequestDropDown extends Component {
  static create(props = {}) {
    const containerElement = document.createElement('div');
    containerElement.setAttribute('id', 'RequestDropDown_container');
    document.getElementById(`table_dots_btn_${props}`).after(containerElement);
    return render(
      <RequestDropDown createDropDownProps={props} />,
      containerElement
    );
  }

  constructor() {
    super();
    this.myRef = null;

    this.setmyRefRef = (element) => {
      this.myRef = element;
    };

    this.state = {
      isOpen: false,
      showDropDownProps: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.show = this.show.bind(this);
  }
  componentDidMount() {
    console.log(this.state.isOpen)
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick= (e)=> {
      if(this.myRef.contains(e.target)) {
          console.log('you clicked inside')
          return;
      }
      this.handleClickOutside()
  }

  handleClickOutside= async () =>{
    console.log('the click is  outside');
    this.myRef = null;
    var element = await document.getElementById('RequestDropDown_container');
    console.log(element)
    await element.parentNode.removeChild(element);
    this.setState({
        isOpen: false
    })
  }


  async show(props = {}) {
    
    await this.setState({ isOpen: true, room_id: props.room_id, setTheState: props.setTheState });

  }

  render() {
    const { setTheState } = this.state;
    console.log(this.myRef)
    
    return (this.state.isOpen === true ?
      <div id="drop_down_node" ref={this.setmyRefRef}>
        <div class="confirm_modal_content">
          <div className="dropdown-content">
            <a>Room settings</a>
            <a onClick={setTheState}>standard room</a>
            <a

            // onClick={() => handleReject(row)}
            >
              deluxe room
            </a>
          </div>
        </div>
      </div> : null
    );
  }
}

export default RequestDropDown;
