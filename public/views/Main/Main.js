import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Logo from '../../components/Logo/Logo';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';

import './Main.scss';

const Main = ({ signout, auth, error }) => (
  <div className="main__wrapper">
    <div className="main">
    <Logo />
    <h1 className="main__title">TechnoShooter</h1>
    {
      auth ? (
        <div>
          <RaisedButton
            className="main__button"
            label="Go game"
            primary={true}
            onTouchTap={() => {browserHistory.push('/game')}}
            fullWidth={true}
          />
          <RaisedButton
            className="main__button"
            label="Leaderboard"
            primary={true}
            fullWidth={true}
            onTouchTap={() => {browserHistory.push('/leaderboard')}}
          />
          <RaisedButton
            className="main__button"
            label="Sign out"
            primary={true}
            fullWidth={true}
            onTouchTap={() => { signout() }}
          />
        </div>
      ) : (
        <div>
          <RaisedButton
            className="main__button"
            label="Sign in"
            primary={true}
            onTouchTap={() => {browserHistory.push('/signin')}}
            fullWidth={true}
          />
          <RaisedButton
            className="main__button"
            label="Sign up"
            primary={true}
            fullWidth={true}
            onTouchTap={() => {browserHistory.push('/signup')}}
          />
          <RaisedButton
            className="main__button"
            label="Leaderboard"
            primary={true}
            fullWidth={true}
            onTouchTap={() => {browserHistory.push('/leaderboard')}}
          />
        </div>
      )
    }
    </div>
  </div>
);

export default Main;
