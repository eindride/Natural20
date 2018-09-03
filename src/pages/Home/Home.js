import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './_home.scss';
/* eslint-disable */
class Home extends Component {
  mouseEnterOverlay = event => {
    const classes = ['home__grid--character', 'home__grid--monster', 'home__grid--spell', 'home__grid--tools'];
    const overlay = event.target.className.includes('home__grid--element-overlay') ? event.target :
      classes.some(cls => event.target.className.includes(cls)) ? event.target.children[0] : null;
    if (overlay) {
      const description = overlay.querySelector('.home__grid--overlay-description');
      console.log({ description });
      overlay.style.height = '50%';
      description.classList.remove('home__hidden');
    }
  }

  mouseLeaveOverlay = event => {
    const overlay = event.target.className.includes('home__grid--element-overlay') ? event.target :
      event.target.className.includes('home__grid--character') ? event.target.children[0] : null;
    if (overlay) {
      const description = overlay.querySelector('.home__grid--overlay-description');
      overlay.style.height = '15%';
      description.classList.add('home__hidden');
    }
  }

  render() {
    const { history } = this.props;
    console.log({ history });
    return (
      <div className="home__wrapper">
        <div className="home__carousel-placeholder">Carousel will be here</div>
        <div className="home__grid">
          <div className="home__grid--character" onMouseOver={this.mouseEnterOverlay} onMouseLeave={this.mouseLeaveOverlay}>
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">Character Creator</h3>
              <p className="home__grid--overlay-description home__hidden">Bacon ipsum dolor amet kevin</p>
            </div>
          </div>
          <div className="home__grid--monster" onMouseOver={this.mouseEnterOverlay} onMouseLeave={this.mouseLeaveOverlay} onClick={() => history.push('/monster-creator')}>
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">Monster Creator</h3>
              <p className="home__grid--overlay-description home__hidden">Bacon ipsum dolor amet kevin</p>
            </div>
          </div>
          <div className="home__grid--spell" onMouseOver={this.mouseEnterOverlay} onMouseLeave={this.mouseLeaveOverlay} onClick={() => history.push('/spell-creator')}>
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">Spell Creator</h3>
              <p className="home__grid--overlay-description home__hidden">Bacon ipsum dolor amet kevin</p>
            </div>
          </div>
          <div className="home__grid--tools" onMouseOver={this.mouseEnterOverlay} onMouseLeave={this.mouseLeaveOverlay}>
            <div className="home__grid--element-overlay">
              <h3 className="home__grid--overlay-title">DM Tools</h3>
              <p className="home__grid--overlay-description home__hidden">Bacon ipsum dolor amet kevin</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
