import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { auth, firebase } from '../../firebase/index';
import './_signUp.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  isValid = (email, password, confirmPassword) =>
    this.isEmailValid(email) && this.isPasswordValid(password, confirmPassword);

  isEmailValid(email) {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (regex.test(email.toLowerCase().trim())) {
      return true;
    }
    this.setState({
      ...this.state,
      error: 'Please enter a valid email address!',
    });
    return false;
  }

  isPasswordValid(password, confirmPassword) {
    if (password === confirmPassword) {
      return true;
    }
    this.setState({
      ...this.state,
      password: '',
      confirmPassword: '',
      error: 'The passwords do not match. Please try again!',
    });
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password, confirmPassword } = this.state;

    const { history } = this.props;

    if (this.isValid(email, password, confirmPassword)) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log({ user });
          this.saveUserToDb(user.uid);
          history.push('/login');
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            error: error.message,
          });
        });
    }
  }

  saveUserToDb = userId => {
    const { db } = firebase;
    const { email, username } = this.state;
    db.collection('users')
      .doc(username)
      .set({
        email,
        username,
        userId,
        role: 'user',
      })
      .then(() => {
        console.log('User saved to DB');
      })
      .catch(error => {
        console.log('Could not save user to DB: ', error);
        this.this.setState(state => ({
          ...state,
          error,
        }));
      });
  };

  render() {
    const { email, username, password, confirmPassword, error } = this.state;
    return (
      <div className="signup">
        <div className="signup__background" />
        <div className="signup__title">Sign Up</div>
        <form onSubmit={this.handleSubmit} className="signup__form" noValidate>
          <input type="email" placeholder="Email" name="email" onInput={this.handleInput} value={email} />
          <input type="text" placeholder="Username" name="username" onInput={this.handleInput} value={username} />
          <input type="password" placeholder="Password" name="password" onInput={this.handleInput} value={password} />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onInput={this.handleInput}
            value={confirmPassword}
          />
          <button type="submit">Sign Up</button>
        </form>
        <span className={`error ${this.state.error && 'hidden'}`}>{error}</span>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default SignUp;
