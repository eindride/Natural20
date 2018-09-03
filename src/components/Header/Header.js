import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebase/index';

import Logo from '../Logo/Logo';

import './_header.scss';

const Header = ({ authUser }) => {
  const authButtons = authUser ? (
    <div className="header__auth-buttons-container">
      <button type="button" className="header__button" onClick={auth.doSignOut}>
        Sign out
      </button>
    </div>
  ) : (
    <div className="header__auth-buttons-container">
      <Link to="/login" href="/login">
        <button type="button" className="header__button">
          Log In
        </button>
      </Link>
      <Link to="/signup" href="/signup">
        <button type="button" className="header__button">
          Sign Up
        </button>
      </Link>
    </div>
  );
  return (
    <header>
      <div className="bar">
        <Logo />
        <div className="header__buttons-wrapper">
          <div className="header__nav-container">
            <Link to="/creatures-list" href="/creatures-list">
              <button className="header__button">Creatures list</button>
            </Link>
            <Link to="/spells-list" href="/spells-list">
              <button className="header__button">Spells list</button>
            </Link>
          </div>
          {authButtons}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authUser: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default withRouter(connect(mapStateToProps)(Header));
