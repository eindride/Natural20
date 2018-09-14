import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase/index';
import { monthNames } from '../../copy/general';
import commentIcon from '../../assets/icons/comment.svg';
import './_monstersListPage.scss';

class Monster extends Component {
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
    const { monster, onClick } = this.props;
    onClick(monster);
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
    const { monster, commentsNr } = this.props;
    const { year, month, day, hour, minute } = this.parseDate(monster.creationDate);
    this.getUsername(monster.userId);
    const { username } = this.state;
    return (
      <div
        className="monsters-list__monster-container"
        onClick={this.handleClick}
        onKeyDown={() => null}
        role="button"
        tabIndex={0}
      >
        <div>
          <p>
            {monster.name} <span className="monsters-list__author">by {username}</span>
          </p>
          <p className="monsters-list__date">Last update: {`${year}, ${day} ${month}, ${hour}:${minute}`}</p>
        </div>
        <div className="monsters-list__comment-icon-container">
          <img src={commentIcon} alt="commentIcon" className="monsters-list__comment-icon" />
          <span>{commentsNr}</span>
        </div>
      </div>
    );
  }
}

Monster.propTypes = {
  monster: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  commentsNr: PropTypes.number.isRequired,
};

export default Monster;
