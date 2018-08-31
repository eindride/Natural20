import React from 'react';
import { Link } from 'react-router-dom';

import './_logo.scss';

const Logo = () => (
  <Link to="/" href="/">
    <h1>Natural 20</h1>
  </Link>
);

export default Logo;
