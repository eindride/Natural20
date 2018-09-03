import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { firebase } from '../../firebase/index';
import { monthNames } from '../../copy/general';
import commentIcon from '../../assets/icons/comment.svg';
import './_spellsListPage.scss';

class Spell extends Component {
  // getUserName = userId => {
  //   firebase.admin
  //     .auth()
  //     .getUser(userId)
  //     .then(userRecord => {
  //       // See the UserRecord reference doc for the contents of userRecord.
  //       console.log('Successfully fetched user data:', userRecord.toJSON());
  //     })
  //     .catch(error => {
  //       console.log('Error fetching user data:', error);
  //     });
  // };

  handleClick = () => {
    const { spell, onClick } = this.props;
    onClick(spell);
  };

  parseDate = date => {
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return {
      year,
      month,
      day,
      hour,
      minute,
    };
  };

  render() {
    const { spell } = this.props;
    const { year, month, day, hour, minute } = this.parseDate(spell.creationDate);
    return (
      <div
        className="spells-list__spell-container"
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        role="button"
        tabIndex={0}
      >
        <div>
          <p>
            {spell.name} <span className="spells-list__author">by placeholder</span>
          </p>
          <p className="spells-list__date">Last update: {`${year}, ${day} ${month}, ${hour}:${minute}`}</p>
        </div>
        <div className="spells-list__comment-icon-container">
          <img src={commentIcon} alt="commentIcon" className="spells-list__comment-icon" />
          <span>2</span>
        </div>
      </div>
    );
  }
}

Spell.propTypes = {
  spell: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Spell;
