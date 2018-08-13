import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import SignUp from '../SignUp/SignUp';
import Home from '../../pages/Home/Home';
import LogIn from '../LogIn/LogIn';

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
		</Switch>
	</main>
)

const mapStateToProps = ({ authUser }) => ({ authUser });

export default withRouter(connect(mapStateToProps)(Main));
