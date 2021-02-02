import React from 'react';
import LogoContainer from './LogoContainer';
import DateContainer from '../containers/DateContainer';
import MealContainer from '../containers/MealContainer';

import '../styles/TopContainer.scss';

const FixedHeader = () => {
  return (
    <div className="FixedHeader">
      <LogoContainer />
      <div className="time-card-container">
        <div className="time-card">
          <DateContainer />
          <MealContainer />
        </div>
      </div>
      <div className="gradient-header" />
      <div className="gray-header" />
    </div>
  );
};

export default FixedHeader;