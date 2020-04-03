import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../InputField';
import MultipleInput from '../multipleInput';
import ImageUploader from '../ImageUploader';
import TextArea from '../TextArea';
import './styles.scss';

const InputMultiple = (currentState, name, handleMultipleChange, removeItem, error) => (
  <MultipleInput
    value={currentState[name]}
    name={name}
    handleMultpleChange={handleMultipleChange}
    removeItem={removeItem}
    error={error}
  />
 );

const InputImageUploader = (setTheState, currentState, error ) => (
  <ImageUploader
    setState={setTheState}
    urls={currentState.urls}
    files={currentState.files}
    isDragging={currentState.isDragging}
    error={error}
  />
);

const InputTextArea = ({name, OnChangeDescription, error})=>{
  return (
    <div className="accommodation_popup_innerContainer_inputContainer_box_div1" id="description_div1">
    <TextArea
      type="text"
      name={name}
      className="input accommodation_popup_innerContainer_inputContainer_box_div1_inputs"
      OnChangeDescription={OnChangeDescription}
      error={error}
    />
  </div>
)};

const InputSingle = (name, OnChange, error, currentState)=> {
  return(
  <div className="accommodation_popup_innerContainer_inputContainer_box_div1">
        <Input
            type="text"
            name={name}
            className="input accommodation_popup_innerContainer_inputContainer_box_div1_inputs"
            onChange={OnChange()}
            error={error}
            // value={currentState[name]}
        />
  </div>
)};

const TypeOfInput = ({
  inputType,
  name,
  OnChange,
  currentState,
  setTheState,
  handleMultipleChange,
  OnChangeDescription,
  removeItem,
  error
}) => {
  switch (inputType) {
    case 'InputMultiple': {
      return InputMultiple(currentState, name, handleMultipleChange, removeItem, error);
    }
    case 'InputImageUploader': {
      return InputImageUploader(setTheState, currentState, error);
    }
    case 'InputTextArea': {
      return InputTextArea({name, OnChangeDescription, error});
    }

    default: {
      return InputSingle(name, OnChange, error, currentState);
    }
  }
};

const LabelInput = ({
  labelName,
  inputType,
  name,
  OnChange,
  currentState,
  setTheState,
  Class,
  handleMultipleChange,
  OnChangeDescription,
  removeItem,
  error
}) => (
    <div className={Class ? `accommodation_popup_innerContainer_inputContainer_box ${Class}` : "accommodation_popup_innerContainer_inputContainer_box"}>
      <div className="accommodation_popup_innerContainer_inputContainer_box_text">
        <label className="accommodation_popup_innerContainer_inputContainer_box_text_texts">
        {labelName}
      </label>
    </div>
    {TypeOfInput({
      inputType,
      name,
      OnChange,
      currentState,
      setTheState,
      handleMultipleChange,
      removeItem,
      OnChangeDescription,
      error
    })}
  </div>
);

LabelInput.propTypes = {
  labelName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default LabelInput;
