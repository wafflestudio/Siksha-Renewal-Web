import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const LogoContainerBlock = styled.div`
  height: 150px;
  width: 280px;
  min-width: 150px;

  .real-logo-container {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 80px;
    width: 100%;

    .left-logo {
      object-fit: contain;
      height: 50px;
      width: 50px;
      
      margin: 0 20px;
      filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.05));
    }

    .siksha-title {
      font-size: 17pt;
      font-weight: bold;
      margin-bottom: 3px;
      color: white;
    }

    .siksha-subtitle {
      font-size: 10pt;
      color: white;
    }

    p {
      margin: 0;
      font-family: 'NanumSquare';
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoContainer = () => {
  return (
    <LogoContainerBlock>
      <div className="real-logo-container">
        <img className="left-logo" src={logo} alt="siksha-logo" />
        <div>
          <p className="siksha-title">식 샤</p>
          <p className="siksha-subtitle">서울대학교 식단 알리미</p>
        </div>
      </div>
    </LogoContainerBlock>
  );
};

export default LogoContainer;