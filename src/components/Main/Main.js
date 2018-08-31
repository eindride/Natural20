import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import SignUp from '../SignUp/SignUp';
import Home from '../../pages/Home/Home';
import LogIn from '../LogIn/LogIn';
import SpellCreatorPage from '../../pages/SpellCreatorPage/SpellCreatorPage';
import MonsterCreatorPage from '../../pages/MonsterCreatorPage/MonsterCreatorPage';
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
		</Switch>
	</main>
)

const mapStateToProps = ({ authUser }) => ({ authUser });

export default withRouter(connect(mapStateToProps)(Main));
