import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Signin from './views/Signin/Signin';

import './css/reset.scss';
import './css/main.scss';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Signin />
  </MuiThemeProvider>
);

render(
  <App />,
  document.querySelector('.content')
);