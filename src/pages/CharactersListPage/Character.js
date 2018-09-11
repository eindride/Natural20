import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase/index';
import { monthNames } from '../../copy/general';
import commentIcon from '../../assets/icons/comment.svg';
import './_charactersListPage.scss';

class Character extends Component {
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
    const { character, onClick } = this.props;
    onClick(character);
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
    const { character } = this.props;
    const { year, month, day, hour, minute } = this.parseDate(character.creationDate);
    this.getUsername(character.userId);
    const { username } = this.state;
    return (
      <div
        className="characters-list__monster-container"
        onClick={this.handleClick}
        onKeyDown={() => null}
        role="button"
        tabIndex={0}
      >
        <div>
          <p>
            {character.name} <span className="characters-list__author">by {username}</span>
          </p>
          <p className="characters-list__date">Last update: {`${year}, ${day} ${month}, ${hour}:${minute}`}</p>
        </div>
        <div className="characters-list__comment-icon-container">
          {/* <img src={commentIcon} alt="commentIcon" className="characters-list__comment-icon" />
          <span>2</span> */}
        </div>
      </div>
    );
  }
}

Character.propTypes = {
  character: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Character;
