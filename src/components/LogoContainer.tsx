import React from 'react';
import logo from '../assets/logo.png';

import '../styles/TopContainer.scss';

const LogoContainer = () => {
  return (
    <div className="logo-container">
      <div className="real-logo-container">
        <img className="left-logo" src={logo} alt="siksha-logo" />
        <div>
          <p className="siksha-title">식 샤</p>
          <p className="siksha-subtitle">서울대학교 식단 알리미</p>
        </div>
      </div>
    </div>
  );
};

export default LogoContainer;