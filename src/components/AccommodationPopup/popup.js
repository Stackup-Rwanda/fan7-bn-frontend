import React, { Component } from 'react';
import './styles.scss';
import closeIcon from '../../assets/images/popup/close-24px.svg'
import Button from '../Button'
import Input from '../InputField'
import MultipleInput from '../multipleInput'
import _ from 'lodash'


class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: {
        values: [],
        input: '',
      },
      amenities: {
        values: [],
        input: '',
      },
      name: '',
      address: '',
      geoLocation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMultpleChange = this.handleMultpleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
    console.log(this.state);
  };

  async removeItem(name, value) {
    const { values } = this.state[name];
    const items = await values.filter((word, index) => index !== value);
    this.setState({ [name]: { values: items }});
  }

  async handleMultpleChange(e) {
    const { name, value } = e.target;
    await this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        input: value
      }
    }));
    const { values } = this.state[name];
    if (value !== ',' && value[value.length - 1] == ',') {
      var word = value.trim().split(/,\s*/);
      await this.setState({
        [name]: {
          values: [...values, word[0]],
          input: '',
        }
      });
    } else {
      await this.setState({
        [name]: {
        values: [...values],
        input: value
      } });
    }
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_innerContainer">
          <div className="popup_innerContainer_close">
            <img
              src={closeIcon}
              onClick={this.props.closePopup}
              alt="closeIcon"
              className="popup_innerContainer_close_closeIcon"
            />
          </div>
          <div className="popup_innerContainer_title">
            <div className="popup_innerContainer_title_name">
              Create your accommodation here
            </div>
          </div>
          <div className="popup_innerContainer_inputContainer">
            <div className="popup_innerContainer_inputContainer_text">
              <label className="popup_innerContainer_inputContainer_text_texts">
                Name
              </label>
            </div>
            <div className="popup_innerContainer_inputContainer_div1">
              <Input
                type="text"
                name="name"
                id="name"
                className="input inputs"
                onChange={this.handleChange}
              />
            </div>
            <div className="popup_innerContainer_inputContainer_text">
              <label className="popup_innerContainer_inputContainer_text_texts">
                Address
              </label>
            </div>
            <div className="popup_innerContainer_inputContainer_div1">
              <Input
                type="text"
                name="address"
                id="address"
                className="input inputs"
                onChange={this.handleChange}
              />
            </div>
            <div className="popup_innerContainer_inputContainer_text">
              <label className="popup_innerContainer_inputContainer_text_texts">
                Geo-location
              </label>
            </div>
            <div className="popup_innerContainer_inputContainer_div1">
              <Input
                type="text"
                name="geoLocation"
                id="GeoLocation"
                className="input inputs"
                onChange={this.handleChange}
              />
            </div>
            <div className="popup_innerContainer_inputContainer_text">
              <label className="popup_innerContainer_inputContainer_text_texts">
                Services
              </label>
            </div>
            <MultipleInput value={this.state.services} name='services' handleMultpleChange={()=> this.handleMultpleChange} removeItem={this.removeItem} />
            
            <div className="popup_innerContainer_inputContainer_text">
              <label className="popup_innerContainer_inputContainer_text_texts">
                Amenities
              </label>
            </div>
            <MultipleInput value={this.state.amenities} name='amenities' handleMultpleChange={() => this.handleMultpleChange} removeItem={this.removeItem} />
            
            <div className="popup_innerContainer_buttons">
              <Button
                type="submit"
                className="btn button"
                value={this.state.isEdit ? 'Update' : 'Submit'}
                onClick={this.handleSubmitBtn}
              />
              <Button
                onClick={this.props.closePopup}
                className="btn button"
                value="Cancel"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;