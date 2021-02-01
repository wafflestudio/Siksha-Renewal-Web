import React from 'react';
import logo from '../assets/logo.png';

import FixedHeader from './FixedHeader';

import '../styles/TopContainer.scss';

const TopContainer: React.FC = () => {
  return (
    <div className="TopContainer">
      <div className="additional-header">
        <img className="top-logo" src={logo} />
      </div>
      <FixedHeader />
    </div>
  );
};

export default TopContainer;