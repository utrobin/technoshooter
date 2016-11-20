import React from 'react';
import VisibleLeaderboard from '../../containers/VisibleLeaderboard';

import './Rating.scss';

const Rating = ({ users }) => (
  <div className="ledearboard">
    <VisibleLeaderboard />
  </div>
);

export default Rating;