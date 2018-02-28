import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/index';

import Logo from '../Logo/Logo';
import Icon from '../Icon/Icon';

import './_header.scss';

class Header extends Component {
  render() {
    const {
      authUser,
    } = this.props;
    const authButtons = (
      authUser
        ? (
          <button type="button" className="headerButton" onClick={auth.doSignOut}>Sign out</button>
        ) : (
          <div className="buttonContainer">
            <Link to="/login"><button type="button" className="headerButton">Log In</button></Link>
            <Link to="/signup"><button type="button" className="headerButton">Sign Up</button></Link>
          </div>
        )
    );
    return (
      <header>
        <div className="bar">
          <Logo />
          {authButtons}
        </div>
        <div className="banner">
          <div className="menuContainer">
            <Link to="/character-builder">
              <button className="menuItem">
                <Icon type="characters" height="50px" width="50px" color="#fff" />
                <span>Characters</span>
              </button>
            </Link>
            <button className="menuItem">
              <Icon type="spells" height="50px" width="50px" color="#fff" />
              <span>Spells</span>
            </button>
            <button className="menuItem">
              <Icon type="items" height="50px" width="50px" color="#fff" />
              <span>Items</span>
            </button>
            <button className="menuItem">
              <Icon type="monsters" height="50px" width="50px" color="#fff" />
              <span>Monsters</span>
            </button>
          </div>
          <div className="navWrapper">
            <h1>Title</h1>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;