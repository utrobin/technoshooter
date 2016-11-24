import React from 'react';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import { browserHistory } from 'react-router';
import {cyan700, cyan800 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

import './Logo.scss';

const iconStyles = {
  width: 80,
  height: 80
};

const logoStyles = {
  width: 160,
  height: 160,
  padding: 30,
};

const Logo = () => (
  <div className="logo">
    <IconButton
      onTouchTap={ () => {browserHistory.push("/")} }
      iconStyle={iconStyles}
      style={logoStyles}
    >
      <HardwareVideogameAsset
        color={cyan700}
        hoverColor={cyan800}
      />
    </IconButton>
  </div>

);

export default Logo
