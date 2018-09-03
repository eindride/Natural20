import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';

import './_logo.scss';

const Logo = () => (
  <Link to="/" href="/">
    <div className="header__logo-container">
      <img src={logo} alt="logo" className="header__logo" />
      <h1 className="header__title">Natural 20</h1>
    </div>
  </Link>
);

export default Logo;
