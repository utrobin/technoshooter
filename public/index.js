import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore';
import isAuth from './tools/isAuth';

import App from './tools/App';
import SigninUser from './containers/Signin';
import SignupUser from './containers/Signup';
import Leaderbord from './containers/Leaderboard';
import Main from './views/Main/Main';
import Error404 from './views/404/404';

import './css/reset.scss';
import './css/main.scss';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const store = configureStore();

isAuth(store.dispatch);

const Application = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/signin" component={SigninUser} />
          <Route path="/signup" component={SignupUser} />
          <Route path="/leaderboard" component={Leaderbord} />
          <Route path="" component={Error404} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

render(
  <Application />,
  document.querySelector('.content')
);
