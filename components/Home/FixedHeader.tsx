import styled from 'styled-components'
import DateContainer from './DateContainer'
import LogoContainer from './LogoContainer'
import MealContainer from './MealContainer'

const FixedHeaderBlock = styled.div`
  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareB.eot');
    src: url('/font/NanumSquareB.woff') format('woff'),
        url('/font/NanumSquareB.ttf') format("truetype");

    font-weight: bold;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareR.eot');
    src: url('/font/NanumSquareR.woff') format('woff'),
        url('/font/NanumSquareR.ttf') format("truetype");
    font-weight: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareL.eot');
    src: url('/font/NanumSquareL.woff') format('woff'),
        url('/font/NanumSquareL.ttf') format("truetype");
    font-weight: 100;
  }

  height: 150px;
  width: 100vw;
  max-width: 100%;

  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;

  z-index: 2;

  .empty-header {
    display: flex;
    justify-content: center;

    .time-card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      height: 150px;
      width: 55vw;
      max-width: 800px;

      z-index: 2;
    }

    .gradient-header {
      height: 80px;
      width: 100%;

      background: linear-gradient(to right, #fd7878 0%,#fe8662 65%,#ff9a44 100%);
      
      position: absolute;
      z-index: -1;
      left: 0;
    }

    .gray-header {
      height: 55px;
      width: 100%;

      background: #f8f8f8;
      
      position: absolute;
      top: 80px;
      z-index: -2;
      left: 0;
    }

    @media (max-width: 768px) {
      .time-card-container {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    top: 100px;
  }
`;

const FixedHeader = () => {
  return (
    <FixedHeaderBlock>
      <div className="empty-header">
        <LogoContainer />
        <div className="time-card-container">
          <DateContainer />
          <MealContainer />
        </div>
        <div className="gradient-header" />
        <div className="gray-header" />
      </div>
    </FixedHeaderBlock>
  );
};

export default FixedHeader;