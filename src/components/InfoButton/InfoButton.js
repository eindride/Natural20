import React, { Component } from 'react';
import PropTypes from 'prop-types';

import infoIcon from '../../assets/icons/info.svg';

class InfoButton extends Component {
  handleClick = () => {
    const { onClick, content } = this.props;
    onClick(content);
  };

  render() {
    return (
      <div
        className="spell-creator__infoButton"
        onClick={this.handleClick}
        onKeyDown={() => null}
        role="button"
        tabIndex={0}
      >
        <img src={infoIcon} alt="infoIcon" />
      </div>
    );
  }
}

InfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.instanceOf(Array).isRequired,
};

export default InfoButton;
