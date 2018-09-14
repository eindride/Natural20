import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase/index';
import { monthNames } from '../../copy/general';
import commentIcon from '../../assets/icons/comment.svg';
import './_spellsListPage.scss';

class Spell extends Component {
  state = {
    username: '',
  };

  getUsername = userId => {
    if (this.state.username === '') {
      const { db } = firebase;
      db.collection('users')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setState(state => ({
              ...state,
              username: doc.data().username,
            }));
          });
        });
    }
  };

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
    const { spell, commentsNr } = this.props;
    const { year, month, day, hour, minute } = this.parseDate(spell.creationDate);
    this.getUsername(spell.userId);
    const { username } = this.state;
    return (
      <div
        className="spells-list__spell-container"
        onClick={this.handleClick}
        onKeyDown={() => null}
        role="button"
        tabIndex={0}
      >
        <div>
          <p>
            {spell.name} <span className="spells-list__author">by {username}</span>
          </p>
          <p className="spells-list__date">Last update: {`${year}, ${day} ${month}, ${hour}:${minute}`}</p>
        </div>
        <div className="spells-list__comment-icon-container">
          <img src={commentIcon} alt="commentIcon" className="spells-list__comment-icon" />
          <span>{commentsNr}</span>
        </div>
      </div>
    );
  }
}

Spell.propTypes = {
  spell: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  commentsNr: PropTypes.number.isRequired,
};

export default Spell;
