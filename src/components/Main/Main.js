import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import SignUp from '../SignUp/SignUp';
import Home from '../../pages/Home/Home';
import LogIn from '../LogIn/LogIn';
import SpellCreatorPage from '../../pages/SpellCreatorPage/SpellCreatorPage';
import MonsterCreatorPage from '../../pages/MonsterCreatorPage/MonsterCreatorPage';
import CharacterCreatorPage from '../../pages/CharacterCreatorPage/CharacterCreatorPage';
import SpellsListPage from '../../pages/SpellsListPage/SpellsListPage';
import MonstersListPage from '../../pages/MonstersListPage/MonstersListPage';
import SpellPage from '../../pages/SpellPage/SpellPage';
import MonsterPage from '../../pages/MonsterPage/MonsterPage';
import CharactersListPage from '../../pages/CharactersListPage/CharactersListPage';
import CharacterPage from '../../pages/CharacterPage/CharacterPage';
/* eslint-disable */
const Main = (props) => (
  <main>
    <Switch>
      <Route exact path='/' render={() => (
        <Home />
      )} />
      <Route path='/signup' render={() => (
        props.authUser !== null ? (
          <Redirect to="/" />
        ) : (
            <SignUp />
          )
      )} />
      <Route path='/login' render={() => (
        props.authUser !== null ? (
          <Redirect to="/" />
        ) : (
            <LogIn />
          )
      )} />
      <Route path='/spell-creator' render={() => (
        <SpellCreatorPage />
      )} />
      <Route path='/monster-creator' render={() => (
        <MonsterCreatorPage />
      )} />
      <Route path='/character-creator' render={() => (
        <CharacterCreatorPage />
      )} />
      <Route path='/characters-list' render={() => (
        <CharactersListPage />
      )} />
      <Route path='/spells-list' render={() => (
        <SpellsListPage />
      )} />
      <Route path='/creatures-list' render={() => (
        <MonstersListPage />
      )} />
      <Route path='/spell/:spellname' render={() => (
        <SpellPage />
      )} />
      <Route path='/monster/:monstername' render={() => (
        <MonsterPage />
      )} />
      <Route path='/character/:charactername' render={() => (
        <CharacterPage />
      )} />
    </Switch>
  </main>
)

const mapStateToProps = ({ authUser }) => ({ authUser });

export default withRouter(connect(mapStateToProps)(Main));
