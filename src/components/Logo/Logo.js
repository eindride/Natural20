import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './_logo.scss';

class Logo extends Component {
    render() {
        return (
            <Link to="/">
                <h1>Natural 20</h1>
            </Link>
        );
    }
}

export default Logo;