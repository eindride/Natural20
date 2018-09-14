import React, { Component } from 'react';
import PropTypes from 'prop-types';

import closeIcon from '../../assets/icons/close.svg';
import heartIcon from '../../assets/icons/heart.svg';
import brokenHeartIcon from '../../assets/icons/brokenHeart.svg';
import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';

import { conditions } from '../../copy/general';

class InitiativeItem extends Component {
  state = {
    extended: false,
    hp: 0,
    hpChange: 0,
    condition: 'none',
  };

  componentWillMount() {
    const { hp } = this.props;
    this.setState(state => ({
      ...state,
      hp: parseInt(hp, 10),
    }));
  }

  handleClick = () => {
    this.setState(state => ({
      ...state,
      extended: !state.extended,
    }));
  };

  handleClose = event => {
    event.stopPropagation();
    const { deleteItemFunc, index } = this.props;
    deleteItemFunc(index);
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState(state => ({
      ...state,
      hpChange: parseInt(value, 10),
    }));
  };

  handleChangeCondition = event => {
    const { value } = event.target;
    const { index, conditionChangeFunc } = this.props;
    conditionChangeFunc(index, value);
    this.setState(state => ({
      ...state,
      condition: value,
    }));
  };

  addHP = () => {
    const { hp, hpChange } = this.state;
    const { index, hpChangeFunc } = this.props;
    hpChangeFunc(index, hp + hpChange);
    this.setState(state => ({
      ...state,
      hp: hp + hpChange,
    }));
  };

  subtractHP = () => {
    const { hp, hpChange } = this.state;
    const { index, hpChangeFunc } = this.props;
    hpChangeFunc(index, hp - hpChange);
    this.setState(state => ({
      ...state,
      hp: hp - hpChange,
    }));
  };

  render() {
    const { name, initiative, currentItem } = this.props;
    const { hp, extended, hpChange, condition } = this.state;
    return (
      <div className={`item  ${extended ? 'extended' : null} ${currentItem ? 'large' : null}`}>
        <div className="item__wrapper" onClick={this.handleClick} onKeyDown={() => null} role="button" tabIndex={0}>
          <div className="item__health-container">
            <img className="item__heart" src={hp > 0 ? heartIcon : brokenHeartIcon} alt="close icon" />
            <span>{hp}</span>
          </div>

          <div className="item__name">
            <span className="item__initiative">{initiative}</span>
            {name}
            <span>{condition !== 'none' ? ` -- ${condition}` : null}</span>
          </div>

          <div
            className="item__close-container"
            onClick={this.handleClose}
            onKeyDown={() => null}
            role="button"
            tabIndex={0}
          >
            <img className="item__close" src={closeIcon} alt="close icon" />
          </div>
        </div>

        <div className={`item__options  ${extended ? 'extended' : null}`}>
          <div className={`${!extended ? 'hidden' : 'item__input-container'}`}>
            <label htmlFor="input-hp">HP:</label>
            <input
              id="input-hp"
              type="number"
              min={0}
              className="item__input"
              value={hpChange}
              onChange={this.handleInputChange}
            />
            <div
              className="item__input-button-container"
              onClick={this.addHP}
              onKeyDown={() => null}
              role="button"
              tabIndex={0}
            >
              <img className="item__input-button" src={plusIcon} alt="plus icon" />
            </div>
            <div
              className="item__input-button-container"
              onClick={this.subtractHP}
              onKeyDown={() => null}
              role="button"
              tabIndex={0}
            >
              <img className="item__input-button" src={minusIcon} alt="plus icon" />
            </div>
          </div>

          <div className={`${!extended ? 'hidden' : 'item__conditions-container'}`}>
            <span>Condition:</span>
            <select id="input-condition" onChange={this.handleChangeCondition}>
              <option value="none">none</option>
              {conditions.map((condition, index) => {
                const key = `condition-${index}`;
                return (
                  <option value={condition} key={key}>
                    {condition}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

InitiativeItem.propTypes = {
  name: PropTypes.string.isRequired,
  hp: PropTypes.string.isRequired,
  deleteItemFunc: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  initiative: PropTypes.string.isRequired,
  currentItem: PropTypes.bool.isRequired,
  hpChangeFunc: PropTypes.func.isRequired,
  conditionChangeFunc: PropTypes.func.isRequired,
};

export default InitiativeItem;
