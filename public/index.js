import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gameApp from './reducers/index';

import Signin from './views/Signin/Signin';
import Signup from './views/Signup/Signup';
import Rating from './views/Rating/Rating';
import Main from './views/Main/Main';

import './css/reset.scss';
import './css/main.scss';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

let store = createStore(gameApp);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router history={browserHistory}>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/leaderboard" component={Rating}/>
        <Route path="/" component={Main}/>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

render(
  <App />,
  document.querySelector('.content')
);