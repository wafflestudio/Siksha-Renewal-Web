import styled from 'styled-components'
import DateContainer from './DateContainer'
import LogoContainer from './LogoContainer'
import MealContainer from './MealContainer'

const FixedHeaderBlock = styled.div`
  @font-face {
    font-family: 'NanumSquare';
    src: url('../assets/NanumSquareB.eot');
    src: url('../assets/NanumSquareB.woff') format('woff'),
        url('../assets/NanumSquareB.ttf') format("truetype");

    font-weight: bold;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('../assets/NanumSquareR.eot');
    src: url('../assets/NanumSquareR.woff') format('woff'),
        url('../assets/NanumSquareR.ttf') format("truetype");
    font-weight: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('../assets/NanumSquareL.eot');
    src: url('../assets/NanumSquareL.woff') format('woff'),
        url('../assets/NanumSquareL.ttf') format("truetype");
    font-weight: 100;
  }

  height: 150px;
  width: 100vw;
  max-width: 100%;

  position: sticky;
  position: -webkit-sticky;
  top: 0;
  
  z-index: 2;

  .empty-header {
    display: flex;
    justify-content: center;

    position: sticky;
    position: -webkit-sticky;
    top: 0;
    left: 0;

    .time-card-container {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 150px;
      width: 60vw;

      z-index: 2;

      .time-card {
        display: flex;
        flex-direction: column;

        height: 110px;
        width: 100%;
        max-width: 800px;

        padding: 5px 0;

        box-shadow: 1px 1px 17px rgba(0, 0, 0, 0.06);
        background: white;
      }
    }

    @media (max-width: 768px) {
      .time-card-container {
        padding: 0px 15px;
        width: 100%;
      }
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
      height: 70px;
      width: 100%;

      background: #f8f8f8;
      
      position: absolute;
      top: 80px;
      z-index: -2;
      left: 0;
    }
  }
`;

const FixedHeader = () => {
  return (
    <FixedHeaderBlock>
      <div className="empty-header">
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
    </FixedHeaderBlock>
  );
};

export default FixedHeader;