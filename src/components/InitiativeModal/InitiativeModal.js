import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InitiativeModal extends Component {
  state = {
    name: '',
    initiative: 0,
    hp: 0,
  };

  handleClose = () => {
    const { toggleFunc } = this.props;
    this.setState({
      name: '',
      initiative: 0,
      hp: 0,
    });
    toggleFunc(null);
  };

  handleNameChange = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      name: value,
    }));
  };

  handleInitiativeChange = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      initiative: value,
    }));
  };

  handleHPChange = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      hp: value,
    }));
  };

  handleSubmit = () => {
    const { submitFunc, toggleFunc } = this.props;
    const { name, initiative, hp } = this.state;
    submitFunc(name, initiative, hp);
    this.setState({
      name: '',
      initiative: 0,
      hp: 0,
    });
    toggleFunc();
  };

  render() {
    const { isOpen } = this.props;
    const { name, initiative, hp } = this.state;
    return (
      <div className={`modal__overlay ${!isOpen ? ' modal__hidden' : ''}`}>
        <div className="modal">
          <button className="imodal__close-button" onClick={this.handleClose}>
            x
          </button>
          <p className="modal__title">Add new creature</p>
          <div className="modal__input-wrapper">
            <label htmlFor="input-name">Name: </label>
            <input
              id="input-name"
              type="text"
              className="modal__input-text"
              value={name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="modal__input-wrapper">
            <label htmlFor="input-initiative">Initiative: </label>
            <input
              id="input-initiative"
              type="number"
              className="modal__input-number"
              value={initiative}
              onChange={this.handleInitiativeChange}
            />
          </div>
          <div className="modal__input-wrapper">
            <label htmlFor="input-hp">Health Points: </label>
            <input
              id="input-hp"
              type="number"
              className="modal__input-number"
              value={hp}
              onChange={this.handleHPChange}
            />
          </div>
          <div className="modal_button" onClick={this.handleSubmit} onKeyDown={() => null} role="button" tabIndex={0}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}

InitiativeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
  submitFunc: PropTypes.func.isRequired,
};

export default InitiativeModal;
