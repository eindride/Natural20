import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import LogIn from '../LogIn/LogIn';
import CharacterBuilder from '../CharacterBuilder/CharacterBuilder';

const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={() => (
        <Home authUser={props.authUser} />
      )} />
      <Route path='/signup' render={() => (
        props.authUser !== null ? (
          <Redirect to="/" />
        ) : (
            <SignUp authUser={props.authUser} />
          )
      )} /> />
      <Route path='/login' render={() => (
        props.authUser !== null ? (
          <Redirect to="/" />
        ) : (
            <LogIn authUser={props.authUser} />
          )
      )} /> />
      <Route path='/character-builder' render={() => (
        props.authUser === null ? (
          <Redirect to="/" />
        ) : (
            <CharacterBuilder authUser={props.authUser} />
          )
      )} /> />
    </Switch>
  </main>
)

export default Main;