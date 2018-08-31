import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/index';
import './_logIn.scss';
/* eslint-disable */
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  isEmailValid(email) {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (regex.test(email.toLowerCase().trim())) {
      return true;
    }
    this.setState({
      ...this.state,
      error: "Please enter a valid email address!",
    });
    return false;
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    if (this.isEmailValid(email)) {
      auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
          localStorage.setItem("authUserUid", authUser.uid);
          history.push('/');
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            password: '',
            error: error.message,
          });
        });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit} className="logInForm" noValidate>
          <input type="email" placeholder="Email" name="email" value={this.state.email} onInput={this.handleInput} />
          <input type="password" placeholder="Password" name="password" value={this.state.password} onInput={this.handleInput} />
          <button type="submit">Log In</button>
        </form>
        <span className={"error " + (this.state.error && "hidden")}>{this.state.error}</span>
      </div>
    );
  }
}

export default withRouter(LogIn);
