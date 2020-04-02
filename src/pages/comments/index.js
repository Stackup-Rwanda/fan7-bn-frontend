import React, { Component } from 'react';
import { connect } from 'react-redux';
import  jwtDecode from 'jwt-decode';
import Moment from 'react-moment';
import Logo from '../../components/logo/logo';
import Button from '../../components/Button/index';
import InputField from '../../components/InputField';
import './style.scss';
import AuthService from '../../utils/AuthService';
import { addComment } from '../../store/modules/comments/actions';
import { viewComments } from '../../store/modules/comments/actions';
import { deleteComment } from '../../store/modules/comments/actions';
import { viewRequest } from '../../store/modules/comments/actions';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            comment: '',
            comments: [],
            request: [],
            error: '',
        };
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
          comment: value,
        });
      }
    
     async handleSubmit(e){
        e.preventDefault();
        const { postComment } = this.props;
        const comment = this.state;
         postComment({
            comment
        });
        await this.props.getComments();
    }
    async componentDidMount() {
      await this.props.getRequest();
      await this.props.getComments();
    }

   async  componentDidUpdate(prevProps){
      if(prevProps.postComment !== this.props.postComment){
         return  await this.props.getComments();
      }
  }

  async destroyComment(id){
    const { removeComment } = this.props;
    removeComment(id);
    await this.props.getComments();
  }
    render () {
      const { comments } = this.props;
      const { request } = this.props;
      const token = AuthService.getToken();
      const { id } = !!token ? jwtDecode(token) : { id: '' };
      const { role } = !!token ? jwtDecode(token) : { role: ''};
        return (
            <div className="request_container">
              <div className="request_container_logo">
                <Logo />
              </div>
              <div className="request_container_request">
                  {/* <h1>This is where request info should fall</h1> */}
                  <div className="request_container_request_left">
                    <ul>
                      <li><h5>Requester</h5><p>{request && request.request.passportName}</p></li>
                      <li><h5>Passport name</h5><p>{request && request.request.passportName}</p></li>
                      <li><h5>Passport number</h5><p>{request && request.request.passportNumber}</p></li>
                      <li><h5>Trip reason</h5><p>{request && request.request.reason}</p></li>
                      <li><h5>Destination</h5><p>{request && request.request.destination}</p></li>
                    </ul>
                  </div>
                  <div className="request_container_request_right">
                  <ul>
                      <li><h5>Travel date</h5><p>{request && request.request.travel_date}</p></li>
                      <li><h5>Return date</h5><p>{request && request.request.return_date}</p></li>
                      <li><h5>Status</h5><p>{request && request.request.status}</p></li>
                      <li><h5>Type</h5><p>{request && request.request.type}</p></li>
                      <li><h5>Origin</h5><p>{request && request.request.origin}</p></li>
                    </ul>
                  </div>
              </div>
              <div className="request_container_comment">
              <div className="request_container_comment_add_comment">
                    <h4>Add a comment</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="request_container_comment_row">
                            <InputField
                            className="request_container_comment_row_text" 
                            type="text" 
                            name="comment" 
                            placeholder="comment" 
                            autocomplete="off" 
                            onChange={this.handleChange}/>
                          </div>
                        <div className="request_container_comment_buttons">
                            <Button 
                            type="submit" 
                            value="Comment" 
                            className=" btn button" 
                            />
                        </div>
                    </form>
                </div>
                <div className="view_comments_item">
                  {comments && comments.comments.length > 0 ?
                  comments.comments.map((comment, index) =>(
                    <div key={comment}>
                  <h4>{comment.user_id === id && role === 'requester' ?
                  'Me'
                : comment.user_id != id && role === 'requester' ?
                'Manager'
                : comment.user_id === id && role ==='manager' ?
                  'Me'
                : 'Requester'}</h4>
                  <p className="view_comments_item_comment">
                    {comment.comment}
                  </p>
                  <small>
                  <Moment fromNow>{comment.createdAt}</Moment></small>
                  <div className="view_comments_delete_button">
                    <a href className="delete" onClick={()=>this.destroyComment(comment.id)}>Delete</a>
                  </div>
                  </div>
                  ))
                  :
                  <div>
                    <h2>No comments yet</h2>
                  </div>  
                    }
                  </div> 
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    comment: state.comment,
    comments: state.postComment,
    request: state.postComment,
});

const mapDispatchToProps = (dispatch) => ({
    postComment: (data) => dispatch(addComment(data)),
    getComments: () => dispatch(viewComments()),
    removeComment: (id) => dispatch(deleteComment(id)),
    getRequest: () => dispatch(viewRequest()),
  });
export default connect(mapStateToProps, mapDispatchToProps)(Comment);