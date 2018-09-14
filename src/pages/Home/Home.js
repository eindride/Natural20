import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import arrowDown from '../../assets/icons/arrow-down.svg';

import './_home.scss';
/* eslint-disable */
class Home extends Component {
  mouseEnterOverlay = event => {
    const classes = ['home__grid--character', 'home__grid--monster', 'home__grid--spell', 'home__grid--tools'];
    const overlay = event.target.className.includes('home__grid--element-overlay')
      ? event.target
      : classes.some(cls => event.target.className.includes(cls))
        ? event.target.children[0]
        : null;
    if (overlay) {
      const description = overlay.querySelector('.home__grid--overlay-description');
      console.log({ description });
      overlay.style.height = '25%';
      description.classList.remove('home__hidden');
    }
  };

  mouseLeaveOverlay = event => {
    const overlay = event.target.className.includes('home__grid--element-overlay')
      ? event.target
      : event.target.className.includes('home__grid--character')
        ? event.target.children[0]
        : null;
    if (overlay) {
      const description = overlay.querySelector('.home__grid--overlay-description');
      overlay.style.height = '15%';
      description.classList.add('home__hidden');
    }
  };

  handleScrollDown = () => {
    const gridElement = document.querySelector('.home__grid');
    gridElement.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
  };

  render() {
    const { history } = this.props;
    console.log({ history });
    return (
      <div className="home__wrapper">
        <div className="home__hero">
          <h1>Welcome, adventurer!</h1>
          <p>
            So you find yourself at the beginning of a new quest. Is your character prepared? What monsters will you encounter? What spells will you use to defeat your enemies? Grab your gear and let the story unfold.
          </p>
          <div className="home__arrow-container" onClick={this.handleScrollDown}>
            <img src={arrowDown} alt="arrow down icon" />
          </div>
        </div>
        <div className="home__grid">
          <div
            className="home__grid--character"
            onMouseOver={this.mouseEnterOverlay}
            onMouseLeave={this.mouseLeaveOverlay}
            onClick={() => history.push('/character-creator')}
          >
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">Character Creator</h3>
              <p className="home__grid--overlay-description home__hidden">Every hero has his skills</p>
            </div>
          </div>
          <div
            className="home__grid--monster"
            onMouseOver={this.mouseEnterOverlay}
            onMouseLeave={this.mouseLeaveOverlay}
            onClick={() => history.push('/monster-creator')}
          >
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">Monster Creator</h3>
              <p className="home__grid--overlay-description home__hidden">Sometimes your adventure needs another monster</p>
            </div>
          </div>
          <div
            className="home__grid--spell"
            onMouseOver={this.mouseEnterOverlay}
            onMouseLeave={this.mouseLeaveOverlay}
            onClick={() => history.push('/spell-creator')}
          >
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">Spell Creator</h3>
              <p className="home__grid--overlay-description home__hidden">Your magic? Spell it out</p>
            </div>
          </div>
          <div
            className="home__grid--tools"
            onMouseOver={this.mouseEnterOverlay}
            onMouseLeave={this.mouseLeaveOverlay}
            onClick={() => history.push('/initiative-tracker')}
          >
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">DM Tools</h3>
              <p className="home__grid--overlay-description home__hidden">For when you need a break from your party</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
