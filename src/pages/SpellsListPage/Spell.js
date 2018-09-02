import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Spell extends Component {
  handleClick = () => {
    const { spell, onClick } = this.props;
    onClick(spell);
  };

  render() {
    const { spell } = this.props;
    return (
      <div
        className="spells-list__spell-container"
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        role="button"
        tabIndex={0}
      >
        {spell.name}
      </div>
    );
  }
}

Spell.propTypes = {
  spell: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Spell;
