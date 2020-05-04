import React, { Component } from 'react';
import './style.scss';
import Button from '../Button';
import _ from 'lodash';


class Popup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            comment: '',
            error: ''
        };
    }

    handleChange(event) {
        const { value } =  event.target;
        this.setState({
            comment: value
        });
    }
     handleSubmit(e){
        e.preventDefault();
        const { addComment } = this.props;
        const comment = this.state;
         addComment({
            comment
        });
    }

    render() {
        return (
            <div className="popup">
                <div className="popup_innerContainer">
                    <div className="popup_innerContainer_inputContainer">
                        <form onSubmit={this.handleSubmit}>
                        <h4 className="text">Add Comment</h4>
                        <div className="popup_innerContainer_inputContainer_div1">
                            <textarea
                            name="comment"
                            id="comment"
                            rows="100"
                            cols="30"
                            placeholder="Add comment here ...."
                            className="input inputs"
                            onChange={this.handleChange}
                        >
                        </textarea>
                        </div>
                    <div className="popup_innerContainer_buttons">
                        <Button
                            type="submit"
                            className="btn button"
                            value="Add comment" 
                        />
                        <Button
                            className="btn button"
                            value="Cancel"
                            onClick={this.props.closePopup}
                        />
                    </div>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default Popup;