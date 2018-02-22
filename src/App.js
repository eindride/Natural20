import React, { Component } from 'react';
import Main from './components/Main/Main';
import { firebase, auth } from './firebase/index';

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
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1 className="App-title">Buna Crina!</h1> */}
          <button type="button" onClick={auth.doSignOut}>Sign out</button>
        </header>
        <Main authUser={this.state.authUser} />
      </div>
    );
  }
}

export default App;
