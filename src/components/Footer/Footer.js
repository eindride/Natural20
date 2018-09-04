import React from 'react';

import './_footer.scss';
import twitterIcon from '../../assets/icons/twitter.svg';
import redditIcon from '../../assets/icons/reddit.svg';

const Footer = () => (
  <footer className="footer">
    <div className="footer__disclaimer-container">
      <p>Platform created for a bachelor degree thesis by Eindride</p>
      <p>All artwork belongs to their respective owners</p>
      <p>For information please send an email at natural20app@gmail.com</p>
    </div>
    <div className="footer__social-container">
      <p>Social links(coming soon):</p>
      <div>
        <img className="footer__social-icon" src={twitterIcon} alt="twitterIcon" />
      </div>
      <div>
        <img className="footer__social-icon" src={redditIcon} alt="redditIcon" />
      </div>
    </div>
  </footer>
);

export default Footer;
