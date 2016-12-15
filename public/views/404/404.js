import React from 'react';
import Error from 'material-ui/svg-icons/alert/error';
import { red800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

import './404.scss'

const iconStyles = {
  width: 80,
  height: 80
};

const logoStyles = {
  width: 110,
  height: 110,
};

const Error404 = ({ error, addUsers }) => (
  <div className="error404__wrapper">
    <div className="error404">
      <IconButton
        iconStyle={iconStyles}
        style={logoStyles}
        className="error404__icon"
      >
        <Error
          color={red800}
        />
      </IconButton>
      <h1 className="error404__h1">Error 404, page not found</h1>
    </div>
  </div>
);

export default Error404;