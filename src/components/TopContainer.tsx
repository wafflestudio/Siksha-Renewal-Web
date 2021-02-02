import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import FixedHeader from './FixedHeader';

const TopContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .additional-header {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100px;
    width: 100%;
    
    z-index: 3;

    background: linear-gradient(to right, #fd7878 0%, #fe8662 65%, #ff9a44 100%);

    .top-logo {
      display: none;
    }

    @media (max-width: 768px) {
      .top-logo {
        display: block;
        object-fit: contain;

        height: 45px;
        width: 45px;

        margin-top: 10px;

        filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.05));
      }
    }
  }
`;

const TopContainer: React.FC = () => {
  return (
    <TopContainerBlock>
      <div className="additional-header">
        <img className="top-logo" src={logo} alt="siksha-logo" />
      </div>
      <FixedHeader />
    </TopContainerBlock>
  );
};

export default TopContainer;