import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { hotjar } from 'react-hotjar';
import { firebase } from './firebase/index';

import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { setLoggedInUser } from './redux/actions';
import { hjid, hjsv } from './hotjar-config';

import './App.scss';
/* eslint-disable */
class App extends Component {
  componentDidMount() {
    hotjar.initialize(hjid, hjsv);

    const { setLoggedInUser } = this.props;
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setLoggedInUser(authUser)
        : setLoggedInUser(null);
    });
  }

  render() {
    const {
      authUser
    } = this.props;
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

const mapDispatchToProps = dispatch => ({
  setLoggedInUser: (authUser) => dispatch(setLoggedInUser(authUser)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
