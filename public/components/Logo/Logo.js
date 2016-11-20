import React from 'react';
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset';
import { Link } from 'react-router'
import {cyan700, pinkA100} from 'material-ui/styles/colors';

import './Logo.scss';

const iconStyles = {
  display: "block",
  width: 80,
  height: 80
};

const Logo = () => (
  <Link to="/">
    <HardwareVideogameAsset
      style={iconStyles}
      color={cyan700}
      hoverColor={pinkA100}
      className="logo"
    />
  </Link>
);

export default Logo