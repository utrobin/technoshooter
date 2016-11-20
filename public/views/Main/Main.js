import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Logo from '../../components/Logo/Logo';
import { browserHistory } from 'react-router';

import './Main.scss';

const Main = () => (
  <div className="main">
    <Logo />
    <h1 className="main__title">TechnoShooter</h1>
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
);

export default Main;
