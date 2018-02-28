import React, { Component } from 'react';
import { firebase } from './firebase/index';

import Main from './components/Main/Main';
import Header from './components/Header/Header';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState((state) => ({
          ...state,
          authUser,
        }))
        : this.setState((state) => ({
          ...state,
          authUser: null
        }));
    });
  }

  render() {
    console.log(this.state.authUser);
    return (
      <div className="App">
        <Header authUser={this.state.authUser} />
        <Main authUser={this.state.authUser} />
      </div>
    );
  }
}

export default App;
