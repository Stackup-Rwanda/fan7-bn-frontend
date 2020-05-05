import React, { Component } from 'react';
import './Chat.scss';
import sendBtn from '../../assets/icons/icons8-email-send-16.png';
import arrow from '../../assets/icons/icons8-expand-arrow-24 (1).png';
import chatIcon from '../../assets/icons/icons8-chat-30.png';
import { getChatMessages, saveChatMessage, connectUser, socket } from '../../utils/helpers/chatHelper';
import { connect } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { toast } from 'react-toastify';
import AuthService from '../../utils/AuthService';
import ToastMessage from './messageToast';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class Chatbot extends Component {
  constructor (props) {
    super (props);
    this.state = {
      open: false,
      unread: 0,
      message: '',
      toastMsg: null,
      receivedMessages: [],
      user: {
        id: '',
        name: '',
      }
    }
    this.closeOrOpen = this.closeOrOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.getChat();
    const token = AuthService.getToken();
    const user = connectUser(token);
    const name = !!user.email ? user.email.split('@')[0] : user.username;

    this.setState({
      user: {
        id: user.id,
        name: name,
      }
    });
        
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevState !== this.state) {
      
      socket.on('chat', data => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        data.createdAt = dateTime;
  
        if(data.senderId !== prevState.user.id && prevState.user.id !== '' ) {
          this.setState({
            unread: prevState.unread + 1,
          });
        }
  
        this.setState({
          toastMsg: data,
          receivedMessages: [
            ...prevState.receivedMessages,
            data,
          ]
        });
        this.handleScroll();
      });
    }
  }

  closeOrOpen() {
    const el = document.getElementsByClassName('chat')[0];
    el.style.display ===  "block" ? el.style.display =  "none" : el.style.display =  "block";
    this.state.open ===  true ?
    this.setState({
      toastMsg: null,
      unread: 0,
      open: false
    })
    :
    this.setState({
      toastMsg: null,
      unread: 0,
      open: true
    });
    this.handleScroll();
  }

  handleScroll() {
    const body = document.getElementsByClassName('chat_body')[0];
    body.scrollTop += body.scrollHeight;
  }

  handleChange(evt) {
    evt.preventDefault();
    const { value } = evt.target;
    const message = value.trimLeft();
    this.setState({ message });
  }

  handleSubmit() {

    const el = document.getElementsByClassName('chat_footer_body_input')[0];
    const inMsg = el.value;
    const inputData = inMsg.charAt(0);
    if(this.state.message === '' || inputData === ' ') {
      return toast.error(' You can\'t send an empty message ');
    }
    const { id, name } = this.state.user;
    const msg = this.state.message;
    const message = msg.trimRight();
    const data = {
      id,
      sender: name,
      message
    }
    this.props.saveMessage(data);
    
    this.setState({
      message: ''
    });
  }

  render() {
    const { receivedMessages, toastMsg, open } = this.state;
    const { messages } = this.props;
    return (
      <>
      {
        toastMsg !==  null && toastMsg.senderId !== this.state.user.id && open === false ? 
        <ToastMessage info={toastMsg} />
        : ''
      }
      <div className="chat">
        <div className="chat_header" onClick={this.closeOrOpen}>
          <p>CHAT </p>
          <img src={arrow} className="chat_header_arrow"/>
        </div>
        <div className="chat_body">
          <div className="chat_body_message">

            {
              messages.length > 0 ?
              messages.map(data => 
                <div className={data.senderId === this.state.user.id ? 'chat_body_message_right' : 'chat_body_message_left'}>
                <div className={data.senderId === this.state.user.id ? 'chat_body_message_sent' : 'chat_body_message_received'}>
                  <div className={data.senderId === this.state.user.id ? 'chat_body_message_sent_text' : 'chat_body_message_received_text'}> {data.message} </div>
                </div>
                <div className="chat_body_time">{data.senderId === this.state.user.id ? 'You' : data.sender}  . {timeAgo.format(new Date(data.createdAt), 'ago')}</div>
              </div>
              )
              :
              <div className="chat_empty_messages"> No conversation yet </div>            
            }

            {
              receivedMessages.length > 0 ? receivedMessages.map( data =>
                <div className={data.senderId === this.state.user.id ? 'chat_body_message_right' : 'chat_body_message_left'}>
                <div className={data.senderId === this.state.user.id ? 'chat_body_message_sent' : 'chat_body_message_received'}>
                  <div className={data.senderId === this.state.user.id ? 'chat_body_message_sent_text' : 'chat_body_message_received_text'}> {data.message} </div>
                </div>
                <div className="chat_body_time">{data.senderId === this.state.user.id ? 'You' : data.sender}  . {timeAgo.format(new Date(data.createdAt), 'ago')}</div>
              </div>
              )
              : ''
            }
 
          </div>
        </div>
        
          <div className="chat_footer">
            <hr className="chat_footer_line"></hr>
            <div className="chat_footer_body">
            <input type="text"
            onChange={(msg) => this.handleChange(msg)}
            value={this.state.message}
            onKeyUp={e => {
              if (e.keyCode === 13) {
                this.handleSubmit();
              }
            }}
            className="chat_footer_body_input"
            name="write_msg"
            placeholder="Send a message..." />

            <button className="chat_footer_body_btn" name="send_msg">
              <img src={sendBtn} name="send_msg_img" className="chat_footer_body_btn_img" onClick={this.handleSubmit} />
            </button>

            </div>
          </div>
      </div>

      <div className="chat_icon">
        <img src={chatIcon} name="popup" alt="chat" onClick={this.closeOrOpen} />
        <span className="chat_icon_unread">{this.state.unread}</span>
      </div>
      </>
    )
  }
}

export const mapState = ({ chat }) => {
  return {
    messages: chat.messages,
    toastMsg: chat.newMessage,
  }
}

export default connect(mapState, {
  getChat: getChatMessages,
  saveMessage: saveChatMessage,
})(Chatbot);
