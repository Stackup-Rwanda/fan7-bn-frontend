import React, { Component } from 'react';
import './style.scss';

class MultipleInput extends Component {

  render() {
    const { input, values } = this.props.value;
    return (
      <div className="bigg_input_container">
        {values.map((word, index) => (
          <div className="bigg_input_container_answer_container" key={index}>
            <div className="bigg_input_container_answer_container_item">
              <span className="bigg_input_container_answer_container_item_word">{word}</span>
              <span className="bigg_input_container_answer_container_item_close" onClick={() => this.props.removeItem(this.props.name, index)}>x</span>
            </div>
          </div>
        ))}
        <input className="bigg_input_container_input_container"
          name={this.props.name}
          type="text"
          value={input === ',' ? '' : input}
          placeholder="add things here"
          onChange={this.props.handleMultpleChange()}
        />
      </div>
    );
  }
}

export default MultipleInput;